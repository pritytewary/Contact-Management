import ContactForm from "@/components/ContactForm";

const EditContactPage = ({ params }) => {
  return <ContactForm id={params.id} />;
};

export default EditContactPage;
