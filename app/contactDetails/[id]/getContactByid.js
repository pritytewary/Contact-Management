import axios from "axios";

const getContactsById = async (id) => {
  try {
    const response = await axios.get(`/api/contact/${id}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export default getContactsById;
