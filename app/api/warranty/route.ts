import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const type = formData.get("type") as string
    const serialNumber = formData.get("serialNumber") as string

    if (!type || !serialNumber) {
      return NextResponse.json(
        { success: false, message: "Product serial number is required" },
        { status: 400 }
      )
    }

    const files = formData.getAll("files") as File[]

    const attachments = await Promise.all(
      files
        .filter((file) => file && file.size > 0)
        .map(async (file) => {
          const bytes = await file.arrayBuffer()
          const buffer = Buffer.from(bytes)

          return {
            filename: file.name,
            content: buffer,
          }
        })
    )

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    let subject = ""
    let html = ""

    if (type === "register") {
      const purchaseDate = formData.get("purchaseDate") as string
      const productCategory = formData.get("productCategory") as string
      const productName = formData.get("productName") as string
      const invoiceNumber = formData.get("invoiceNumber") as string
      const dealerName = formData.get("dealerName") as string
      const fullName = formData.get("fullName") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const address = formData.get("address") as string

      subject = `New Warranty Registration - ${serialNumber}`

      html = `
        <h2>Warranty Registration</h2>
        <p><strong>Serial Number:</strong> ${serialNumber}</p>
        <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
        <p><strong>Product Category:</strong> ${productCategory}</p>
        <p><strong>Product Name:</strong> ${productName}</p>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Dealer Name:</strong> ${dealerName}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Installation Address:</strong> ${address}</p>
      `
    }

    if (type === "claim") {
      const productCategory = formData.get("productCategory") as string
      const issueType = formData.get("issueType") as string
      const issueDescription = formData.get("issueDescription") as string
      const fullName = formData.get("fullName") as string
      const email = formData.get("email") as string
      const phone = formData.get("phone") as string
      const address = formData.get("address") as string

      subject = `New Warranty Claim - ${serialNumber}`

      html = `
        <h2>Warranty Claim</h2>
        <p><strong>Serial Number:</strong> ${serialNumber}</p>
        <p><strong>Product Category:</strong> ${productCategory}</p>
        <p><strong>Issue Type:</strong> ${issueType}</p>
        <p><strong>Issue Description:</strong></p>
        <p>${issueDescription}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Installation Address:</strong> ${address}</p>
      `
    }

    if (type === "status") {
      subject = `Warranty Status Check - ${serialNumber}`

      html = `
        <h2>Warranty Status Check</h2>
        <p><strong>Serial Number:</strong> ${serialNumber}</p>
      `
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject,
      html,
      attachments,
    })

    return NextResponse.json({
      success: true,
      message: "Request submitted successfully",
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}