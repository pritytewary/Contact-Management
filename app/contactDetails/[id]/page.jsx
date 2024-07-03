import React from "react";
import ContactDetails from "./Details";

const DetailsPage = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <ContactDetails id={params.id} />
    </div>
  );
};

export default DetailsPage;
