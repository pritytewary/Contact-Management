"use client";

import { useEffect, useState } from "react";
import ContactList from "./AllContacts";
import getContacts from "./getContacts";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  return (
    <div className="">
      <ContactList contacts={contacts} />
    </div>
  );
}
