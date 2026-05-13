// app/api/career/route.ts

import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const jobTitle = formData.get("jobTitle") as string
    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const portfolio = formData.get("portfolio") as string
    const coverLetter = formData.get("coverLetter") as string
    const resume = formData.get("resume") as File | null

    if (!jobTitle || !fullName || !email || !resume) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      )
    }

    const bytes = await resume.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Job Application - ${jobTitle}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Applied For:</strong> ${jobTitle}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>LinkedIn / Portfolio:</strong> ${portfolio || "Not provided"}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter || "Not provided"}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
        },
      ],
    })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}