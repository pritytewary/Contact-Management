import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import Contact from "@/models/Contact";
import HttpError from "http-errors";

async function deleteContactApi(req, res) {
  const jwtUser = verifyUser(req.cookies.token);
  const userId = jwtUser.id;

  const { id } = req.query;

  if (!id) {
    throw new HttpError.BadRequest("Contact ID is required");
  }

  const contact = await Contact.findOneAndDelete({ _id: id, user: userId });

  if (!contact) {
    throw new HttpError.NotFound("Contact not found");
  }

  res.status(200).json({
    message: "Contact Deleted",
  });
}

export default withApiWrapper(deleteContactApi);
