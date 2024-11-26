import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import {
  sectionIds,
  socialContact
} from "@/shared/constants-enums/navigation-list";
import SocialIcons from "@/shared/components/social-share";
import ContactForm from "./(components)/contact-form";

const ContactUs = () => {
  return (
    <SectionContainer
      id={sectionIds.contact}
      title="We’re Just a Click Away"
      quotation="Click. Connect. Create."
      containerProps={{
        className: "pt-4 mt-4"
      }}
    >
      <div className="relative grid grid-flow-row md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-[clamp(20px,2vw,2vw+15px)]">
            Got questions or an idea to bring to life? Let’s connect—I’m here to
            help make it happen!
          </h1>
          {
            <SocialIcons
              socialContact={socialContact}
              className="!flex !flex-col !gap-4"
              linkProps={{
                className: "flex gap-4 items-center"
              }}
              showTitle
            />
          }
        </div>
        <ContactForm />
      </div>
    </SectionContainer>
  );
};

export default ContactUs;
