import { verifyUser } from "@/lib/jwt";
import withApiWrapper from "@/lib/with-api-wrapper";
import Contact from "@/models/Contact";

async function listContactsApi(req, res) {
  try {
    const jwtUser = verifyUser(req.cookies.token);
    const userId = jwtUser.id;

    const sort = req.query.sort;
    const isNewest = sort === "newest";

    // Fetch and sort contacts by name in ascending order
    const contacts = await Contact.find({ user: userId }).sort({
      firstname: 1,
      lastname: 1,
    });

    const totalContacts = await Contact.countDocuments({
      user: userId,
    });

    // Set caching headers
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.status(200).json({
      message: "Contacts Retrieved",
      total: totalContacts,
      sort: isNewest ? "newest" : "oldest",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default withApiWrapper(listContactsApi);
