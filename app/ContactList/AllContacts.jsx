"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaSearch, FaEllipsisV } from "react-icons/fa";

const getInitials = (name) => {
  const names = name.split(" ");
  const initials = names.map((n) => n[0]).join("");
  return initials;
};

const ContactList = ({ contacts }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [contactList, setContactList] = useState(contacts);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  const handleAddContact = () => {
    router.push("/contact");
  };

  const handleViewContact = (id) => {
    router.push(`/contactDetails/${id}`);
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      const updatedContacts = contactList.filter(
        (contact) => contact._id !== id
      );
      setContactList(updatedContacts);
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEditContact = (id) => {
    router.push(`/editContact/${id}`);
  };

  const filteredContacts = contactList
    .filter((contact) =>
      contact.firstname && contact.lastname
        ? `${contact.firstname} ${contact.lastname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : false
    )
    .sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`.toLowerCase();
      const nameB = `${b.firstname} ${b.lastname}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-blue-500 to-blue-700">
      <div className="w-full max-w-2xl bg-white p-4 rounded-xl shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Contacts</h2>
          <button
            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full"
            onClick={handleAddContact}
          >
            +
          </button>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search contacts"
            className="p-2 w-full border rounded-md pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <ul className="flex flex-col">
          {filteredContacts.map((contact) => (
            <li
              key={contact._id}
              className="flex items-center mb-4 cursor-pointer justify-between"
            >
              <div
                className="flex items-center"
                onClick={() => handleViewContact(contact._id)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-4"
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
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(`${contact.firstname} ${contact.lastname}`)
                  )}
                </div>
                <span className="text-lg text-black">{`${contact.firstname} ${contact.lastname}`}</span>
              </div>
              <div className="relative">
                <FaEllipsisV
                  className="text-gray-600 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(
                      dropdownOpen === contact._id ? null : contact._id
                    );
                  }}
                />
                {dropdownOpen === contact._id && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded-md shadow-lg">
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditContact(contact._id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteContact(contact._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {filteredContacts.length === 0 && (
          <p className="text-center text-gray-500">No contacts available</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
