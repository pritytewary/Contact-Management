import { NextApiRequest, NextApiResponse } from "next";
import { isHttpError } from "http-errors";
import { connectDB } from "../db";

const withApiWrapper = (Fn: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await connectDB();
      await Fn(req, res);
    } catch (err) {
      if (isHttpError(err)) {
        return res.status(err.status).send({
          type: err.name,
          message: err.message,
        });
      }

      res.status(500).send({
        type: "InternalServerError",
        message: (err as Error).message,
      });
    }
  };
};

export default withApiWrapper;
