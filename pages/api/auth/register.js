import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import HttpError from "http-errors";

async function signupApi(req, res) {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new HttpError.BadRequest("User already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });

  res.status(201).json({
    message: "User registered.",
    data: user,
  });
}

export default withApiWrapper(signupApi);
