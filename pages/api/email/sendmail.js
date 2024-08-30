import { UserModel } from "../../../models/UserModel";
import connectMongoDB from "../../../libs/mongodb";
import { withCors } from "../../../libs/corsmiddilewares";

async function handler(req, res) {
  let { zurawallet } = req?.headers;
  let { receiver } = req?.body;

  await connectMongoDB;

  const nodemailer = require("nodemailer");
  const fs = require("fs");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    host: "smtp.gmail.com",

    auth: {
      user: "noreplyzuraverse@gmail.com",
      pass: "nljpuhzrvhswnslf",
    },
  });

  let otpValue = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: "noreplyzuraverse@gmail.com",
    to: receiver,
    subject: "Your One-Time Password (OTP) for Secure Access",
    html: `<h4>Dear Zurain,</h4>
              <p>Warm welcome to Zuraverse</p>
              <p>We got a request to verify your email address. </p>
              <p>Here is the OTP ${otpValue}.</p>
              <p>Remember, this OTP is valid for the next 10 minutes.
              For security reasons, please do not share this OTP with anyone.</p>
              <p>Best Regards,</p>
              <p>Team Zuraverse.</p>
        `,
  };

  try {
    await connectMongoDB();
    const info = await transporter.sendMail(mailOptions);
    await UserModel.findOneAndUpdate(
      { zurawallet },
      { otp: otpValue}
    );

    setTimeout(async () => {
      await UserModel.findOneAndUpdate({ zurawallet }, { otp: null });
    }, 180000);

    res.status(200).json({ success: true, info });
  } catch (error) {
    res.status(500).json({ success: false, error });
    console.log(error);
  }
}
export default withCors(handler);
