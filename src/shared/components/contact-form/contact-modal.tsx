"use client";
import React from "react";
import Button from "../button";
import Modal, { modalVariant } from "../modal";
import ContactUs from ".";

const ContactModal = () => {
  const [openModal, toggleModal] = React.useState<boolean>(false);

  return (
    <>
      <Button
        className="bg-primary-gradient hover:bg-primary-hover-gradient p-3"
        onClick={() => toggleModal(true)}
      >
        Reach Out to Me
      </Button>
      <Modal
        open={openModal}
        close={() => toggleModal(false)}
        variant={modalVariant.large}
        title="React Out to Me"
        titleProps={{
          className: "text-gradient"
        }}
      >
        <div className="p-4">
          <ContactUs
            contentProps={{
              className: "text-[clamp(15px,1.5,1+15px)]"
            }}
            mainContainerProps={{
              className: "!grid-cols-1 lg:!grid-cols-2 !items-start"
            }}
            leftContainerProps={{
              className: "hidden lg:flex"
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ContactModal;
