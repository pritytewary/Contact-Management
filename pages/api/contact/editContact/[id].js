import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import Contact from "@/models/Contact";
import HttpError from "http-errors";

async function editContactApi(req, res) {
  const jwtUser = verifyUser(req.cookies.token);
  const userId = jwtUser.id;

  const { id } = req.query;
  const { firstname, lastname, email, phone, address, note } = req.body;

  if (!id) {
    throw new HttpError.BadRequest("Contact ID is required");
  }

  const contact = await Contact.findOneAndUpdate(
    { _id: id, user: userId },
    { firstname, lastname, email, phone, address, note },
    { new: true }
  );

  if (!contact) {
    throw new HttpError.NotFound("Contact not found");
  }

  res.status(200).json({
    message: "Contact Updated",
    data: contact,
  });
}

export default withApiWrapper(editContactApi);
