import "server-only";

import { SendEmailCommand, SendRawEmailCommand } from "@aws-sdk/client-ses";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { sesClient } from "@/lib/aws";

export type TemplateType = "user" | "generic";

export type EmailAttachment = {
  filename: string;
  content: Buffer | Uint8Array;
  contentType?: string;
};

type TemplateData = Record<string, string | number | boolean | null | undefined>;

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.morzze.com";
}

function getDefaultTemplateData(): TemplateData {
  const baseUrl = getBaseUrl();

  return {
    baseUrl,
    logoUrl:
      process.env.EMAIL_LOGO_URL ||
      "https://av-morzze.s3.ap-south-1.amazonaws.com/logo.png",
  };
}

function getEmailSource() {
  return process.env.EMAIL_FROM || '"Morzze" <info@avtechnosys.com>';
}

async function loadTemplate(type: TemplateType, template: string) {
  const templatePath = path.join(
    process.cwd(),
    "email-templates",
    type,
    `${template}.html`,
  );

  return readFile(templatePath, "utf8");
}

export function renderTemplate(html: string, data: TemplateData = {}) {
  const mergedData = {
    ...getDefaultTemplateData(),
    ...data,
  };

  return html.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_match, key: string) => {
    return escapeHtml(mergedData[key.trim()]);
  });
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return sesClient.send(
    new SendEmailCommand({
      Source: getEmailSource(),
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: html },
        },
      },
    }),
  );
}

export async function sendTemplateEmail({
  to,
  subject,
  template,
  type,
  data,
}: {
  to: string;
  subject: string;
  template: string;
  type: TemplateType;
  data?: TemplateData;
}) {
  const templateHtml = await loadTemplate(type, template);
  const html = renderTemplate(templateHtml, data);

  return sendEmail({ to, subject, html });
}

function encodeMimeHeader(value: string) {
  return Buffer.from(value).toString("base64");
}

function normalizeContent(content: Buffer | Uint8Array) {
  return Buffer.isBuffer(content) ? content : Buffer.from(content);
}

function foldBase64(value: string) {
  return value.match(/.{1,76}/g)?.join("\r\n") || "";
}

function escapeMimeAttribute(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export async function sendEmailWithAttachments({
  to,
  subject,
  html,
  attachments,
}: {
  to: string;
  subject: string;
  html: string;
  attachments: EmailAttachment[];
}) {
  const boundary = `morzze-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const message = [
    `From: ${getEmailSource()}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${encodeMimeHeader(subject)}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    ...attachments.flatMap((attachment) => [
      "",
      `--${boundary}`,
      `Content-Type: ${attachment.contentType || "application/octet-stream"}; name="${escapeMimeAttribute(attachment.filename)}"`,
      `Content-Disposition: attachment; filename="${escapeMimeAttribute(attachment.filename)}"`,
      "Content-Transfer-Encoding: base64",
      "",
      foldBase64(normalizeContent(attachment.content).toString("base64")),
    ]),
    "",
    `--${boundary}--`,
  ].join("\r\n");

  return sesClient.send(
    new SendRawEmailCommand({
      Source: getEmailSource(),
      Destinations: [to],
      RawMessage: {
        Data: Buffer.from(message),
      },
    }),
  );
}
