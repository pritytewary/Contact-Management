import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import Contact from "@/models/Contact";

import HttpError from "http-errors";

async function createcontactApi(req, res) {
  console.log(req.cookies.token);
  const jwtUser = verifyUser(req.cookies.token);

  const userId = jwtUser.id;

  const { firstname, lastname, email, phone, address, note } = req.body;

  if (!firstname || !lastname || !email || !phone || !address || !note) {
    throw new HttpError.BadRequest("All the fields are required");
  }

  const contactCreate = await Contact.create({
    firstname,
    lastname,
    email,
    phone,
    address,
    note,
    user: userId,
  });

  res.status(201).json({
    message: "Contact Created",
    data: contactCreate,
  });
}

export default withApiWrapper(createcontactApi);
