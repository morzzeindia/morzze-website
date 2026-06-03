import "server-only";

import { SESClient } from "@aws-sdk/client-ses";

const accessKeyId =
  process.env.SES_AWS_ACCESS_KEY_ID ||
  process.env.SES_USER ||
  process.env.AWS_ACCESS_KEY_ID;

const secretAccessKey =
  process.env.SES_AWS_SECRET_ACCESS_KEY ||
  process.env.SES_PASS ||
  process.env.AWS_SECRET_ACCESS_KEY;

export const sesClient = new SESClient({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
  },
});
