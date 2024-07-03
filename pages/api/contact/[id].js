import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import Contact from "@/models/Contact";

async function getContactById(req, res) {
  try {
    const jwtUser = verifyUser(req.cookies.token);
    const userId = jwtUser.id;
    const { id } = req.query;

    const contact = await Contact.findOne({ user: userId, _id: id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact Retrieved",
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default withApiWrapper(getContactById);
