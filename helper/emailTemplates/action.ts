"use server";
import nodemailer from "nodemailer";

export async function sendOrderConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  orderDate: string,
  amount: any,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"AV Technosys" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Your Morzze Order Confirmation ",
      html:  `
       <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      font-family: &quot;Segoe UI&quot;, Roboto, Arial, sans-serif;
    "
  >
    <center>
      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
          border-radius: 12px 12px 0px 0px;
          overflow: hidden;
        "
      >
        <div style="padding: 10px 20px; text-align: left">
          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #fff;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Morzze
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #fff;
              margin-bottom: 25px;
            "
          >
            Order Confirmation
          </h2>

          <!-- Greeting -->
          <p style="font-size: 14px; color: #fff">
            Hi ${firstName},
          </p>

          <p style="font-size: 14px; color: #fff; line-height: 1.6">
            Your order has been successfully placed, and we’re already getting
            it ready for you.
          </p>

          <!-- Order Summary -->
          <h3
            style="
              font-size: 15px;
              color: #fff;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
            Order Summary
          </h3>

          <p style="font-size: 14px; color: #fff; line-height: 1.6">
            Order ID: ${orderId}<br />
            Order Date: ${orderDate}<br />
            Total Amount: ${amount}
          </p>

          <!-- What Happens Next -->
          <h3
            style="
              font-size: 15px;
              color: #fff;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
            What Happens Next
          </h3>

          <ul
            style="
              padding-left: 18px;
              color: #fff;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            <li>Your order will be processed within 24–48 hours</li>
            <li>
              You will receive a shipping confirmation with tracking details
            </li>
            <li>Expected delivery: 3–5 business days</li>
          </ul>

          <!-- About -->
          <h3
            style="
              font-size: 15px;
              color: #fff;
              margin-top: 25px;
              margin-bottom: 10px;
            "
          >
Crafted for Modern Living          </h3>

          <p style="font-size: 14px; color: #fff; line-height: 1.6">
            At Morzze, we believe kitchens and bathrooms are more than just spaces — they are experiences of comfort, elegance, and functionality.
          </p>
          <p style="font-size: 14px; color: #fff; line-height: 1.6">
           Every Morzze product is thoughtfully designed to offer:

          <ul
            style="
              padding-left: 18px;
              color: #fff;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            <li>• Premium craftsmanship and lasting durability</li>
            <li>• Modern aesthetics with timeless elegance</li>
            <li>• Functional innovation for everyday convenience</li>
            <li>• Superior quality finishes for refined interiors</li>
          </ul>

          <!-- Quote -->
          <p
            style="
              font-size: 14px;
              color: #fff;
              font-style: italic;
              margin-top: 20px;
              text-align: center;
            "
          >
            “Luxury is found in the details of everyday living.”
          </p>

          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #fff;
              margin-bottom: 25px;
            "
          >
            ~ Team Morzze
          </p>

          <!-- Support -->
          <div style="text-align: center; margin-top: 20px">
            <p style="font-size: 13px; color: #fff; margin-bottom: 8px">
              Need Help?
            </p>

            <p
              style="
                max-width: 400px;
                margin: 0 auto;
                font-size: 13px;
                color: #fff;
                line-height: 1.6;
              "
            >
              If you have any questions about your order, feel free to reach out
            </p>

            <p style="margin-top: 6px">
              <a
                href="mailto:support@morzze.com"
                style="color: #fff; font-weight: bold; text-decoration: none"
              >
                support@morzze.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #000000;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #fff;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note: Products are carefully inspected before dispatch to ensure premium quality and customer satisfaction.
        </p>

        <p
          style="
            font-size: 11px;
            color: #fff;
            text-align: center;
            margin-top: 10px;
          "
        >
        © 2026  Morzze. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendFirstPurchaseEmail(email: string, firstName: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome to Morzze! Your First Purchase Gift Awaits You",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #fff;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Morzze
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #fff;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            First Purchase Thank You
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #fff">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
             Thank you for your first purchase with Morzze.
We’re delighted to welcome you to a world of refined design, premium craftsmanship, and modern living.
            </p>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
            Your journey toward beautifully designed kitchen and bathroom spaces starts here.
            </p>

            <!-- Why We Exist -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
             What Makes Morzze Different
            </h3>

           
            <ul style="padding-left: 18px; font-size: 14px; color: #fff; line-height: 1.6;">
              <li>• Premium-quality materials and durable finishes</li>
              <li>• Sophisticated designs crafted for modern homes</li>
              <li>• Attention to detail in every product</li>
              <li>• A balance of style, practicality, and innovation</li>
            </ul>
 <p style="font-size: 14px; color: #fff; line-height: 1.6">
         We’re not just creating products — we’re creating experiences that elevate the spaces you use every day.
            </p>
            <!-- What Makes Us Different -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
             A Brand Built for Modern Living
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #fff; line-height: 1.6;">
              <li>Whether it’s your kitchen or bathroom, every Morzze</li>
              <li>product is designed to add beauty, comfort, and</li>
              <li>convenience to your lifestyle.</li>
            </ul>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
          We’re excited to be a part of your home.
            </p>

            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
            Share Your Experience
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
              Once you’ve experienced your product, don’t forget to share your feedback and help others discover the Morzze experience.
            </p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #fff;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
           “Luxury begins with the spaces you live in every day.”
          </p>

          <p style="text-align: center; font-size: 13px; color: #fff;">
           ~ Team Morzze
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #fff;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help Getting Started?<br />
           If you have any questions about your order, feel free to reach out: 
            <a
              href="mailto:support@morzze.com"
              style="color: #fff; text-decoration: none; font-weight: bold"
            >
              support@morzze.com

            </a>
          </p>

        </div>
      </div>

         <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #000000;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #fff;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
        Note:Your saved cart won’t stay forever — complete your order before your items are gone
        </p>

        <p
          style="
            font-size: 11px;
            color: #fff;
            text-align: center;
            margin-top: 10px;
          "
        >
         © 2026  Morzze. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterEmail(
  email: string,
  firstName: string,
  shopLink: string,
  subscriptionLink: string = "https://www.morzze.com/subscribe",
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject:
        "Morzze Newsletter: Your Guide to Timeless Kitchens & Bathrooms",
      html: `
      <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              color: #fff;
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Morzze
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #fff;
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            Newsletter / Educational Campaign Sample
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #fff">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
A beautifully designed kitchen or bathroom is more than just aesthetics — it’s about comfort, functionality, and everyday ease.

At Morzze, we believe thoughtful details can transform daily living into a refined experience.            </p>

            <!-- What Matters -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
              Here's What Matters
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #fff; line-height: 1.6;">
              <li>Premium-quality materials ensure durability and reliability</li>
              <li>Modern finishes enhance the elegance of your interiors</li>
              <li>Smart functionality improves convenience in everyday use</li>
            <li>Timeless designs blend effortlessly with contemporary spaces</li>
            </ul>

            <!-- Alternative -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
              Elevate Your Space
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
Whether you’re upgrading your kitchen essentials or refining your bathroom interiors, Morzze products are crafted to bring together style and performance.            </p>
 <p style="font-size: 14px; color: #fff; line-height: 1.6">
   Our collections are designed to offer:
 </p>
            <ul style="padding-left: 18px; font-size: 14px; color: #fff; line-height: 1.6;">
              <li>Sophisticated modern aesthetics</li>
              <li>Long-lasting craftsmanship</li>
              <li>Easy maintenance and practical usability</li>
              <li>Luxury-inspired comfort for everyday living</li>
            </ul>

            <!-- Switch -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
            Discover More
            </h3>

            <p style="font-size: 14px; color: #fff;">
              Explore thoughtfully designed products created for modern homes.
            </p>

            <p style="font-size: 14px; color: #fff;">
             Explore Morzze Collections: 
              <a
                href="{{Shop Link}}"
                style="color: #fff; font-weight: bold; text-decoration: none"
              >
                ${shopLink}
              </a>
            </p>

            <!-- Subscription -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
              Want Exclusive Updates?
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
Stay connected and be the first to know about:            </p>

            <ul style="padding-left: 18px; font-size: 14px; color: #fff; line-height: 1.6;">
              <li>New product launches</li>
              <li>Design inspiration and trends</li>
              <li>Exclusive offers and collections</li>
              <li>Special subscriber-only updates</li>
            </ul>

            <p style="font-size: 14px; color: #fff;">
              Subscribe Now: 
              <a
                href="{{Subscription Link}}"
                style="color: #fff; font-weight: bold; text-decoration: none"
              >
                  ${subscriptionLink}
              </a>
            </p>

            

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              color: #fff;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
“Small details create spaces that feel extraordinary.”          </p>

          <p style="text-align: center; font-size: 13px; color: #fff;">
~ Team Morzze          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #fff;
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help ?<br />
           If you have any questions about your order, feel free <br /> to reach out: support@Morzze.com

            <a
              href="mailto:support@morzze.com"
              style="color: #1b7f85; text-decoration: none; font-weight: bold"
            >
              support@morzze.com
            </a>
          
          </p>

          

        </div>
      </div>
        <!-- FOOTER LOGOS -->
     

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
            color: #999;
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note:Your saved cart won’t stay forever — complete your order before your items are gone
        </p>

        <p
          style="
            font-size: 11px;
            color: #999;
            text-align: center;
            margin-top: 10px;
          "
        >
         © 2026  Morzze. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendUserExperienceEmail(
  email: string,
  firstName: string,
  reviewLink: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject:
        "How Was Your Experience with Morzze? We’d Love to Hear from You!",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      color: #fff;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
         Morzze
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 18px;
            
              margin-bottom: 25px;
              font-weight: 600;
            "
          >
            How Was Your Experience?
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px;">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; line-height: 1.6">
We hope your Morzze order has reached you safely and that you’ve had the chance to experience the quality and craftsmanship firsthand.            </p>

            <!-- Share Experience -->
            <h3 style="font-size: 15px;  margin-top: 25px;">
              Share Your Experience
            </h3>

            <p style="font-size: 14px;  line-height: 1.6">
Your feedback helps us grow and continue delivering premium products and exceptional experiences.            </p>
  <p style="font-size: 14px;  line-height: 1.6">
Tell us what you loved — from design and finish to functionality and overall satisfaction.
</p>
            <p style="font-size: 14px; margin-top: 10px;">
              Leave a Review:
              <a
                href="{{Review Link}}"
                style=" font-weight: bold; text-decoration: none; color:#fff;"
              >
                ${reviewLink}
              </a>
            </p>

            <!-- Why Feedback -->
            <h3 style="font-size: 15px;  margin-top: 25px;">
              Why Your Feedback Matters
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; line-height: 1.6;">
              <li>Helps others make confident choices for their homes</li>
              <li>Allows us to improve our products and customer experience</li>
              <li>Supports a growing community that values quality and modern design</li>
            </ul>

            <!-- Real Care -->
            <h3 style="font-size: 15px; margin-top: 25px;">
Designed for Modern Living            </h3>

            <p style="font-size: 14px;  line-height: 1.6">
At Morzze, we create products that combine elegance, durability, and practicality for contemporary kitchens and bathrooms.   
</p>
 <p style="font-size: 14px;  line-height: 1.6">
Every detail is thoughtfully crafted to deliver:</p>

<ul style="padding-left: 18px; font-size: 14px; line-height: 1.6;">
              <li>Premium finishes and timeless aesthetics</li>
              <li>Reliable everyday performance</li>
              <li>Comfort, convenience, and lasting quality</li>
            </ul>

            <!-- Thank You -->
            <h3 style="font-size: 15px;  margin-top: 25px;">
              A Small Thank You
            </h3>

            <p style="font-size: 14px; line-height: 1.6">
As a token of appreciation, you may receive exclusive offers, early product access, and special updates after sharing your feedback.  
</p>

          </div>

          <!-- QUOTE -->
          <p
            style="
              font-size: 13px;
              
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
         “Great spaces are built on experiences worth sharing.”
          </p>

          <p style="text-align: center; font-size: 13px; ">
        ~ Team Morzze
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              
              margin-top: 20px;
              line-height: 1.6;
            "
          >
            Need Help ?<br />
            Need help or facing any issue? Reach out to us at<br />
            <a
              href="mailto:support@morzze.com"
              style="color: #FDB813; text-decoration: none; font-weight: bold"
            >
              support@morzze.com
            </a>
            – we're here for you.
          </p>

         

        </div>
      </div>
        <!-- FOOTER LOGOS -->
      <div
        style="
          background-color: #000000;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
        

        <!-- Footer Note -->
        <p
          style="
            max-width: 400px;
            font-size: 11px;
           
            margin-top: 20px;
            text-align: center;
            line-height: 1.5;
          "
        >
          Note:Your saved cart won’t stay forever — complete your order before your items are gone
        </p>

        <p
          style="
            font-size: 11px;
           
            text-align: center;
            margin-top: 10px;
          "
        >
         © 2026  Morzze. All rights reserved.
        </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

export async function sendShippingConfirmationEmail(
  email: string,
  orderId: any,
  firstName: any,
  trackingUrl: any,
  courierName: any,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Shipping Confirmation",
      html: `
        <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      color: #fff;
      font-family: &quot;Segoe UI&quot;, Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
           color: #fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">
          <!-- Logo -->
          <h1
            style="
              text-align: center;
             color: #fff
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Morzze 
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              color: #fff
              margin-bottom: 25px;
            "
          >
            Shipping Confirmation
          </h2>

          <!-- CONTENT (LEFT ALIGNED FIX) -->
          <div style="text-align: left">
            <p style="font-size: 14px; color: #fff">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
             Great news — your Morzze order has been shipped and is now on its way to you.
            </p>

            <h3 style="font-size: 15px;  margin-top: 25px">
              Shipment Details
            </h3>

            <p style="font-size: 14px;  line-height: 1.6">
              Order ID: ${orderId}<br />
              Courier Partner: ${courierName}<br />
              Track Your Order:
              <a
                href="${trackingUrl}"
                style="color: #fff; text-decoration: none; font-weight: bold"
              >
                Click Here
              </a>
            </p>

            <h3 style="font-size: 15px; color: #fff; margin-top: 25px">
              Estimated Delivery
            </h3>

            <p style="font-size: 14px; color: #fff">
              Your order is expected to arrive within 3–5 business days.
            </p>

            <h3 style="font-size: 15px; color: #fff; margin-top: 25px">
              What’s Coming Your Way
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
              Your Morzze products are crafted to bring together elegance, durability, 
              and everyday functionality for modern kitchens and bathrooms.
            </p>
            <p style="font-size: 14px; color: #fff; line-height: 1.6">
              Designed with attention to detail, every product offers:
            </p>
            <ul style="padding-left: 18px; font-size: 14px; color: #fff">
              <li>Premium-quality materials and finishes</li>
              <li>Sleek modern aesthetics for refined interiors</li>
              <li>Long-lasting durability and reliable performance</li>
            <li>  Comfort and convenience for daily living</li>
            </ul>

            <h3 style="font-size: 15px; color: #fff; margin-top: 25px">
              Quick Care Tip
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
             Once your order arrives, we recommend inspecting the product carefully and following the installation guidelines for the best experience and long-lasting performance.
            </p>
          </div>

          <!-- CENTER PART -->
          <p
            style="
              font-size: 14px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 20px;
            "
          >
“Thoughtfully designed spaces begin with quality details.”          </p>

          <p style="text-align: center; font-size: 13px; color: #fff">
           ~ Team Morzze
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #fff;
              margin-top: 20px;
            "
          >
            Need Help?<br />
            <p style="
              max-width: 400px;
              margin: 0 auto;
              text-align: center;
              font-size: 14px;
              color: #fff;
              
            " >   
          
            For any shipment-related questions, write to care 
            </p>
          support@morzze.com
          </p>

        </div>
      </div>
       <div
        style="
          background-color: #000000;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
        <!-- Footer Logos -->
       <!-- FOOTER LOGOS -->
          

          <!-- FOOTER TEXT -->
          <p
            style="
                max-width: 400px;
              font-size: 11px;
              color: #999;
              text-align: center;
              margin-top: 20px;
            "
          >
          Note: Products are carefully packed and quality-checked before dispatch to ensure they reach you in perfect condition.
          </p>

          <p style="font-size: 11px; color: #999; text-align: center">
          © 2026  Morzze. All rights reserved.
          </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

// export async function sendrefillReminderEmail(
//   email: string,
//   firstName: string,
//   order: any,
//   products: any,
//   orderDate: string,
//   reorderLink: string,
//   SubscriptionLink: string,
// ) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
//       port: 587, // or 2587 or 25
//       secure: false, // TLS starts automatically
//       auth: {
//         user: process.env.SES_USER,
//         pass: process.env.SES_PASS,
//       },
//     });

//     const mailOptions = {
//       from: '"AV Technosys" <info@avtechnosys.com>',
//       to: [`${email}`],
//       subject: "Refill Reminder / Subscription Prompt",
//       html: `
//         <body
//     style="
//       margin: 0;
//       padding: 10px;
//       background-color: #e6f2f3;
//       font-family: 'Segoe UI', Roboto, Arial, sans-serif;
//     "
//   >
//     <center>
//       <div
//         class="container"
//         style="
//           max-width: 500px;
//           margin: 0px auto;
//           background-color: #fff;
//           border-radius: 12px 12px 0px 0px;
//         "
//       >
//         <div style="padding: 20px">

//           <!-- Logo -->
//           <h1
//             style="
//               text-align: center;
//               color: #1b7f85;
//               font-size: 28px;
//               margin-bottom: 5px;
//             "
//           >
//             Potent
//           </h1>

//           <h2
//             style="
//               text-align: center;
//               font-size: 16px;
//               color: #333;
//               margin-bottom: 25px;
//               font-weight: 600;
//             "
//           >
//             Refill Reminder / Subscription Prompt
//           </h2>

//           <!-- LEFT CONTENT -->
//           <div style="text-align: left">

//             <p style="font-size: 14px; color: #555">
//               Hi ${firstName},
//             </p>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Running low on your hygiene essentials? This is a gentle reminder to restock before you run out.
//             </p>

//             <!-- Last Purchase -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Your Last Purchase
//             </h3>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Products: ${products}<br />
//               Ordered On: ${orderDate}
//             </p>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Based on typical usage, it might be time to refill and stay worry-free.
//             </p>

//             <!-- Benefits -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Stay Prepared, Always
//             </h3>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Whether it's your Ovy period care essentials or Looway hygiene solutions, keeping a refill ready means:
//             </p>

//             <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
//               <li>No last-minute stress</li>
//               <li>Consistent comfort and hygiene</li>
//               <li>Confidence wherever you go</li>
//             </ul>

//             <!-- Reorder -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Reorder in Seconds
//             </h3>

//             <p style="font-size: 14px;">
//               <a
//                 href="{{Reorder Link}}"
//                 style="color: #555; font-weight: bold; text-decoration: none"
//               >
//                 Reorder Now : ${reorderLink}
//               </a>
//             </p>

//             <!-- Subscription -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Want It on Auto-Pilot?
//             </h3>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Never run out again. Subscribe and get your products delivered automatically.
//             </p>

//             <ul style="padding-left: 18px; font-size: 14px; color: #555; line-height: 1.6;">
//               <li>Flexible delivery frequency</li>
//               <li>Easy cancellations anytime</li>
//               <li>Zero stress, always stocked</li>
//             </ul>

//             <p style="font-size: 14px; margin-top: 10px;">
//               Start Subscription:
//               <a
//                 href={${SubscriptionLink}}
//                 style="color: #1b7f85; font-weight: bold; text-decoration: none"
//               >
//                  ${SubscriptionLink}
//               </a>
//             </p>

//           </div>

//           <!-- QUOTE -->
//           <p
//             style="
//               font-size: 13px;
//               color: #888;
//               font-style: italic;
//               text-align: center;
//               margin-top: 25px;
//             "
//           >
//             “Stay stocked. Stay confident.”
//           </p>

//           <p style="text-align: center; font-size: 13px; color: #555;">
//             – Team Potent Hygiene
//           </p>

//           <!-- SUPPORT -->
//           <p
//             style="
//               text-align: center;
//               font-size: 13px;
//               color: #555;
//               margin-top: 20px;
//               line-height: 1.6;
//             "
//           >
//             Need Help ?<br />
//             Need help choosing the right products or frequency?<br />
//             Reach out at
//             <a
//               href="mailto:care@potenthygiene.com"
//               style="color: #1b7f85; text-decoration: none; font-weight: bold"
//             >
//               care@potenthygiene.com
//             </a>
//             – we’re here for you.
//           </p>

          

//         </div>
//       </div>

//         <!-- FOOTER LOGOS -->
//       <div
//         style="
//           background-color: #D3F5F9;
//           max-width: 500px;
//           padding: 10px 0px;
//           border-radius: 0px 0px 12px 12px;
//         "
//       >
//         <!-- Footer Logos -->
//         <div
//           style="
//             display: flex;
//             justify-content: center;
//             gap: 20px;
            
//             align-items: center;
//           "
//         >
//           <!-- Footer Logos -->
//           <div
//             style="
//               max-width: 400px;
//               margin: 0 auto;
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               gap: 30px;
//             "
//           >
//             <img
//               src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
//               width="70"
//               style="vertical-align: middle"
//             />

//             <img
//               src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
//               width="80"
//               style="vertical-align: middle"
//             />
//           </div>
//         </div>

//         <!-- Footer Note -->
//         <p
//           style="
//             max-width: 400px;
//             font-size: 11px;
//             color: #999;
//             margin-top: 20px;
//             text-align: center;
//             line-height: 1.5;
//           "
//         >
//           Note: Due to the personal nature of hygiene products, items are
//           non-returnable. However, if you face any issue, we’re here to help.
//         </p>

//         <p
//           style="
//             font-size: 11px;
//             color: #999;
//             text-align: center;
//             margin-top: 10px;
//           "
//         >
//           © 2024 Potent Hygiene. All rights reserved.
//         </p>
//       </div>
//     </center>
//   </body>
//       `,
//     };

//     const result = await transporter.sendMail(mailOptions);

//     return { success: true, result };
//   } catch (error) {
//     console.error("SES Email Error:", error);
//     return { success: false, error };
//   }
// }

export async function sendDeliveryConfirmationEmail(
  email: string,
  firstName: string,
  orderId: string,
  deliveryDate: string,
  reviewLink: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Delivery Confirmation",
      html: `
       <body
    style="
      margin: 0;
      padding: 10px;
      background-color: #000000;
      color:#fff;
      font-family: 'Segoe UI', Roboto, Arial, sans-serif;
    "
  >
    <center>
      <div
        class="container"
        style="
          max-width: 500px;
          margin: 0px auto;
          background-color: #171717;
          color:#fff;
          border-radius: 12px 12px 0px 0px;
        "
      >
        <div style="padding: 20px">

          <!-- Logo -->
          <h1
            style="
              text-align: center;
              
              font-size: 28px;
              margin-bottom: 5px;
            "
          >
            Potent
          </h1>

          <h2
            style="
              text-align: center;
              font-size: 16px;
              
              margin-bottom: 25px;
            "
          >
            Delivery Confirmation
          </h2>

          <!-- LEFT CONTENT -->
          <div style="text-align: left">

            <p style="font-size: 14px; color: #fff">
              Hi ${firstName},
            </p>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
              Your Morzze order has been successfully delivered.
We hope everything reached you in perfect condition and enhances your space beautifully
            </p>

            <!-- Delivery Details -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
              Delivery Details
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
              Order ID: ${orderId}<br />
              Delivered On: ${deliveryDate}
            </p>

            <!-- Features -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
            Thank You for Choosing Morzze
            </h3>

            <p style="font-size: 14px; color: #fff; line-height: 1.6">
Your selected products are crafted to combine modern aesthetics, premium quality, and everyday functionality for elegant kitchens and bathrooms. </br></br>
With Morzze, you can expect:
</p>

            <ul style="padding-left: 18px; font-size: 14px; color: #fff;">
              <li> Sophisticated and timeless designs</li>
              <li> Durable craftsmanship with premium finishes</li>
              <li> Reliable performance for daily use</li>
               <li> A refined experience built for modern living</li>
            </ul>

            <!-- Tips -->
            <h3 style="font-size: 15px; color: #fff; margin-top: 25px;">
              Care & Maintenance Tips
            </h3>

            <ul style="padding-left: 18px; font-size: 14px; color: #fff;">
              <li> Clean surfaces regularly using a soft cloth</li>
              <li> Avoid harsh chemicals or abrasive cleaners</li>
              <li> Follow installation and maintenance guidelines carefully</li>
                <li>  Keep fittings dry after use for lasting shine and performance</li>
            </ul>

            <!-- Review -->
            <p style="font-size: 14px; color: #fff; margin-top: 20px;">
Your experience matters to us.
Share your feedback and help others discover the Morzze experience.            </p>

            <p style="font-size: 14px; margin-top: 10px;">
              <a
                href={${reviewLink}}
                style="color: #fff; font-weight: bold; text-decoration: none"
              >
                Leave a Review
              </a>
            </p>

          </div>

          <!-- CENTER QUOTE -->
          <p
            style="
              font-size: 14px;
              color: #888;
              font-style: italic;
              text-align: center;
              margin-top: 25px;
            "
          >
“Beautiful spaces are created with details that last.”          </p>

          <p style="text-align: center; font-size: 13px; color: #fff;">
           ~ Team Morzze
          </p>

          <!-- SUPPORT -->
          <p
            style="
              text-align: center;
              font-size: 13px;
              color: #fff;
              margin-top: 20px;
            "
          >
            Need Help?<br />
            <p style="
              max-width: 400px;
              margin: 0 auto;
              text-align: center;
              font-size: 14px;
              color: #fff;
              
            " >   
             If you have any questions or face any issues, we’re just an email away
            </p>
            support@morzze.com
          </p>

         

        </div>
      </div>

      <div
        style="
          background-color: #000000;
          max-width: 500px;
          padding: 10px 0px;
          border-radius: 0px 0px 12px 12px;
        "
      >
       

          <!-- FOOTER TEXT -->
          <p
            style="
              max-width: 400px;
              font-size: 11px;
              color: #fff;
              text-align: center;
              margin-top: 20px;
            "
          >
Note: Products are carefully packed and quality-checked before
dispatch to ensure they reach you in perfect condition.          </p>

          <p style="font-size: 11px; color: #999; text-align: center;">
            © 2026  Morzze. All rights reserved.
          </p>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}

// export async function sendCartAbandonmentEmail(
//   email: string,
//   firstName: string,
//   productNames: any,
//   checkoutLink: string,
//   reviewLink: string,
// ) {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
//       port: 587, // or 2587 or 25
//       secure: false, // TLS starts automatically
//       auth: {
//         user: process.env.SES_USER,
//         pass: process.env.SES_PASS,
//       },
//     });

//     const mailOptions = {
//       from: '"AV Technosys" <info@avtechnosys.com>',
//       to: [`${email}`],
//       subject: "Your Cart Abandoned",
//       html: `
//        <body
//     style="
//       margin: 0;
//       padding: 10px;
//       background-color: #e6f2f3;
//       font-family: 'Segoe UI', Roboto, Arial, sans-serif;
//     "
//   >
//     <center>
//       <div
//         class="container"
//         style="
//           max-width: 500px;
//           margin: 0px auto;
//           background-color: #fff;
//           border-radius: 12px 12px 0px 0px;
//         "
//       >
//         <div style="padding: 20px">

//           <!-- Logo -->
//           <h1
//             style="
//               text-align: center;
//               color: #1b7f85;
//               font-size: 28px;
//               margin-bottom: 5px;
//             "
//           >
//             Potent
//           </h1>

//           <h2
//             style="
//               text-align: center;
//               font-size: 16px;
//               color: #333;
//               margin-bottom: 25px;
//             "
//           >
//             Cart Abandonment
//           </h2>

//           <!-- LEFT CONTENT -->
//           <div style="text-align: left">

//             <p style="font-size: 14px; color: #555">
//               Hi ${firstName},
//             </p>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Looks like you left something in your cart  and we saved it for you.
//             </p>

//             <!-- Cart -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Your Cart Is Waiting
//             </h3>

//             <p style="font-size: 14px; color: #555;">
//               Items: ${productNames}
//             </p>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Whether it's your Ovy period care essentials or Looway hygiene solutions, you're just one step away from better comfort, hygiene, and confidence.
//             </p>

//             <!-- Delivery -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Estimated Delivery
//             </h3>

//             <p style="font-size: 14px; color: #555;">
//               Your order is expected to arrive within 3–5 business days.
//             </p>

//             <!-- Benefits -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Why Complete Your Purchase?
//             </h3>

//             <p style="font-size: 14px; color: #555; line-height: 1.6">
//               Whether you’ve chosen Ovy period care essentials or Looway hygiene
//               solutions, your products are designed to deliver
//             </p>

//             <ul style="padding-left: 18px; font-size: 14px; color: #555;">
//               <li>Safe and skin-friendly – no harsh chemicals</li>
//               <li>Designed for real life – from periods to travel emergencies</li>
//               <li>Trusted by women like you – everyday hygiene simplified</li>
//             </ul>

//             <!-- Urgency -->
//             <h3 style="font-size: 15px; color: #333; margin-top: 25px;">
//               Don’t Miss Out
//             </h3>

//             <p style="font-size: 14px; color: #555;">
//               Your cart items are in demand and may go out of stock soon.
//             </p>

//             <!-- CTA -->
//             <div style="margin-top: 15px;">
//               <p
                
//                 style="
//                   color: #555;
//                   font-size: 14px;
//                   font-weight: bold;
//                   display: inline-block;
//                 "
//               >
//                 Complete Your Order Now : ${checkoutLink}
//               </p>
//             </div>

//             <!-- Review -->
//             <p style="font-size: 14px; color: #555; margin-top: 20px;">
//               We'd Love Your Feedback! Once you've tried your product, share your experience and help others make better choices.
//             </p>

//             <p style="font-size: 14px;">
//               <a
//                 href={${reviewLink}}
//                 style="color: #1b7f85; font-weight: bold; text-decoration: none"
//               >
//                 Leave a Review
//               </a>
//             </p>

//           </div>

//           <!-- CENTER QUOTE -->
//           <p
//             style="
//               font-size: 13px;
//               color: #888;
//               font-style: italic;
//               text-align: center;
//               margin-top: 25px;
//             "
//           >
//             “Take care of your hygiene, your way. We’ll be right here when you're ready.”
//           </p>

//           <p style="text-align: center; font-size: 13px; color: #555;">
//             – Team Potent Hygiene
//           </p>

//           <!-- SUPPORT -->
//           <p
//             style="
//               text-align: center;
//               font-size: 13px;
//               color: #555;
//               margin-top: 20px;
//             "
//           >
//             Need Help?<br />
//             <p style="
//               max-width: 400px;
//               margin: 0 auto;
//               text-align: center;
//               font-size: 14px;
//               color: #555;
              
//             " >   
//             Whether you’re choosing the right size, product, or combo, we’re here for you:
//             </p>
//             care@potenthygiene.com
//           </p>

//         </div>
//       </div>
//       <!-- FOOTER LOGOS -->
//           <div style="background-color: #D3F5F9 ;max-width: 500px; padding: 10px 0px; border-radius: 0px 0px 12px 12px;">
//             <div style="text-align: center; margin-top: 20px;">
//             <img
//               src="https://ik.imagekit.io/avtechnosys/potent-hygiene/ovy.png"
//               width="70"
//               style="margin-right: 10px"
//             />

//             <img
//               src="https://ik.imagekit.io/avtechnosys/potent-hygiene/looway.png"
//               width="80"
//             />
//           </div>

//           <!-- FOOTER TEXT -->
//           <p
//             style="
//               font-size: 11px;
//               color: #999;
//               text-align: center;
//               margin-top: 20px;
//             "
//           >
//             P.S. Your comfort shouldn't wait. Checkout now before your cart expires.
//           </p>

//           <p style="font-size: 11px; color: #999; text-align: center;">
//             © 2024 Potent Hygiene. All rights reserved.
//           </p>
//           </div>
//     </center>
//   </body>
//       `,
//     };

//     const result = await transporter.sendMail(mailOptions);

//     return { success: true, result };
//   } catch (error) {
//     console.error("SES Email Error:", error);
//     return { success: false, error };
//   }
// }

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: "email-smtp.ap-south-1.amazonaws.com", // SES endpoint
      port: 587, // or 2587 or 25
      secure: false, // TLS starts automatically
      auth: {
        user: process.env.SES_USER,
        pass: process.env.SES_PASS,
      },
    });

    const mailOptions = {
      from: '"Morzze" <info@avtechnosys.com>',
      to: [`${email}`],
      subject: "Welcome To Morzze - Your Account is Ready!",
      html: `
 <body
    style="
      margin: 0;
      padding: 0;
      background-color: #000000;
      color:#fff;
      font-family: &quot;Segoe UI&quot;, Roboto, Helvetica, Arial, sans-serif;
    "
  >
    <center>
      <!-- Header -->
      <div
        style="
          background-color: #171717;
          border-bottom: 1px solid #eeeeee;
          padding: 15px 0;
          text-align: center;
          width: 100%;
        "
      >
        <span
          style="
            font-size: 18px;
            color: #fff;
            font-weight: 700;
            letter-spacing: 0.5px;
          "
        >
          Success
        </span>
      </div>

      <!-- Container -->
      <div
        class="container"
        style="
          max-width: 500px;
          background-color: #171717;
          text-align: center;
          margin: auto;
        "
      >
        <div style="padding: 40px 20px">
          <!-- Icon -->

          <h1
            style="
              font-size: 32px;
              color: #fff;
              margin: 0 0 20px 0;
              font-weight: 700;
            "
          >
            Welcome To Morzze
          </h1>

          <p
            style="
              font-size: 16px;
              color: #fff;
              line-height: 1.6;
              margin: 0 0 40px 0;
            "
          >
            Hi <span style="color: #fff; font-weight: bold">${name}</span>, your
            account has been successfully created. Your journey starts here!
          </p>

          <!-- Start Shopping Button -->
          <div style="margin-bottom: 15px">
            <a
              href="https://www.Morzze.com/products"
              style="
                display: block;
                background-color: #000000;
                color: #ffffff;
                padding: 18px;
                text-decoration: none;
                border-radius: 40px;
                font-weight: bold;
                font-size: 18px;
              "
            >
              <img
                src="https://ik.imagekit.io/avtechnosys/yunanved/welcome2.png"
                width="20"
                style="vertical-align: middle; margin-right: 10px"
              />

              Start Shopping
            </a>
          </div>

          <p
            style="
              font-size: 13px;
              color: #fff;
              line-height: 1.5;
              margin: 0;
              padding: 0 20px;
            "
          >
            If you have any questions, feel free to reach us at<br />

            <a
              href="mailto:support@morzze.com.com"
              style="color: #fff; text-decoration: none; font-weight: bold"
            >
              support@morzze.com
            </a>
          </p>
        </div>
      </div>
    </center>
  </body>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    return { success: true, result };
  } catch (error) {
    console.error("SES Email Error:", error);
    return { success: false, error };
  }
}
