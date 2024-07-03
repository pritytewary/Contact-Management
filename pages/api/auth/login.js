import User from "@/models/User";
import bcrypt from "bcryptjs";
import HttpError from "http-errors";
import withApiWrapper from "@/lib/with-api-wrapper";
import { sign } from "@/lib/jwt";
import { serialize } from "cookie";

async function loginApi(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError.NotFound("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError.BadRequest("Invalid credentials");
  }

  const TTL = 1000 * 60 * 60 * 7; // 7 days
  const token = sign(
    {
      type: "auth",
      id: user._id,
      email: user.email,
    },
    TTL
  );

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      maxAge: TTL,
      path: "/",
    })
  );
  res.status(200).json({
    message: "Login successfully",
    token,
  });
}

export default withApiWrapper(loginApi);
