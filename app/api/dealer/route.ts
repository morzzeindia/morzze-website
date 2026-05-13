// app/api/dealer/route.ts

import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      fullName,
      businessName,
      email,
      phone,
      city,
      businessType,
      address,
      yearsInBusiness,
      businessDetails,
    } = body

    if (
      !fullName ||
      !businessName ||
      !email ||
      !phone ||
      !city ||
      !businessType ||
      !businessDetails
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      )
    }

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
      subject: `New Dealer Application - ${businessName}`,
      html: `
        <h2>New Dealer Application</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Business Type:</strong> ${businessType}</p>
        <p><strong>Address:</strong> ${address || "Not provided"}</p>
        <p><strong>Years in Business:</strong> ${yearsInBusiness || "Not provided"}</p>
        <p><strong>Business Details:</strong></p>
        <p>${businessDetails}</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Dealer application sent successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}