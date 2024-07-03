import axios from "axios";

const getContacts = async () => {
  try {
    const response = await axios.get("/api/contact/contactList");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export default getContacts;
