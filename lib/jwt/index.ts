import jwt from "jsonwebtoken";
import HttpError from "http-errors";

export function sign(payload = {}, ttl = 3600) {
  return jwt.sign(
    {
      ...payload,
      nbf: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + ttl,
    },
    (process.env as any).JWT_SECRET
  );
}

export function verify(token: string) {
  try {
    return jwt.verify(token, (process.env as any).JWT_SECRET);
  } catch (error) {
    throw new HttpError.Unauthorized("Token is invalid");
  }
}

export function verifyUser(token: string) {
  try {
    const decoded = verify(token) as AuthPayload;
    if (decoded.type !== "auth")
      throw new HttpError.Unauthorized("Token is invalid");

    return decoded;
  } catch (error) {
    throw new HttpError.Unauthorized("Login is expired, please login again");
  }
}

export type LoginPayload = {
  type: "login";
  id: string;
};

export type AuthPayload = {
  type: "auth";
  id: string;
  email: string;
};
