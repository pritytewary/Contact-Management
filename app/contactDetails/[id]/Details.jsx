"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import getContactsById from "./getContactByid";

const getInitials = (name) => {
  const names = name.split(" ");
  const initials = names.map((n) => n[0]).join("");
  return initials;
};

const ContactDetails = ({ id }) => {
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContactsById(id);
      if (data) {
        setContact(data);
      } else {
        setError("Error fetching contact details");
      }
      setLoading(false);
    };

    fetchContact();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-blue-700">
      <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="w-10 h-10 flex items-center justify-center bg-yellow-600 text-white rounded-full"
            onClick={() => router.push("/ContactList")}
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold">Contact Details</h2>
          <button
            className="w-10 h-10 flex items-center justify-center bg-blue-300 text-white rounded-full"
            onClick={() => router.push(`/editContact/${id}`)}
          >
            <FaEdit />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white mb-4"
            style={{
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            }}
          >
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={`${contact.firstname} ${contact.lastname}`}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              getInitials(`${contact.firstname} ${contact.lastname}`)
            )}
          </div>
          <span className="text-lg text-black">{`${contact.firstname} ${contact.lastname}`}</span>
          <span className="text-lg text-black">{contact.phone}</span>
          <span className="text-lg text-black">{contact.email}</span>
          <span className="text-lg text-black">{contact.address}</span>
          <span className="text-lg text-black">{contact.note}</span>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Connected Apps</h3>
          <div className="flex space-x-4">
            {contact.connectedApps?.includes("Meet") && (
              <button className="bg-gray-200 p-2 rounded-lg">
                <img
                  src="/public/meet.png"
                  alt="Google Meet"
                  className="w-6 h-6"
                />
              </button>
            )}
            {contact.connectedApps?.includes("WhatsApp") && (
              <button className="bg-gray-200 p-2 rounded-lg">
                <img src="/public/wp.jpg" alt="WhatsApp" className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Contact Settings</h3>
          <div className="flex space-x-4">
            <button className="bg-gray-200 p-2 rounded-lg">Reminders</button>
            <button className="bg-gray-200 p-2 rounded-lg">
              Block numbers
            </button>
            <button className="bg-gray-200 p-2 rounded-lg">
              Route to voicemail
            </button>
            <button className="bg-gray-200 p-2 rounded-lg">
              View linked contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
