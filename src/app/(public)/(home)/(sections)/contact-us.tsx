import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import ContactUs from "@/shared/components/contact-form";

const ContactMe = () => {
  return (
    <SectionContainer
      id={sectionIds.contact}
      title="We’re Just a Click Away"
      quotation="Click. Connect. Create."
      containerProps={{
        className: "pt-4 mt-4"
      }}
    >
      <ContactUs />
    </SectionContainer>
  );
};

export default ContactMe;
