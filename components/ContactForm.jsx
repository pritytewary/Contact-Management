"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAccessToken } from "@/lib/access-token";
import Link from "next/link";
import getContactsById from "@/app/editContact/[id]/getOneContact";

const ContactForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    label: "mobile",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchContact = async () => {
        const data = await getContactsById(id);
        if (data) {
          setFormData(data);
        } else {
          setError("Error fetching contact details");
        }
      };
      fetchContact();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, phone, address, note } = formData;

    if (!firstname || !lastname || !email || !phone || !address || !note) {
      setError("All fields are required");
      return;
    }

    const token = getAccessToken();

    try {
      const response = await fetch(
        `/api/contact/${isEditMode ? `editContact/${id}` : "createContact"}`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message);
        setError("");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          address: "",
          note: "",
          label: "mobile",
        });
        router.push("/ContactList");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setSuccess("");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-blue-700">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Link href={"/ContactList"}>
            <button className="text-gray-600">X</button>
          </Link>
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Contact" : "Create Contact"}
          </h2>
          <button className="text-blue-600 font-bold" onClick={handleSubmit}>
            Save
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          {success && <div className="mb-4 text-green-600">{success}</div>}
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
