import Button from "@/shared/components/button";
import Modal from "@/shared/components/modal";
import React, { useState } from "react";

const ModalPreviewer = () => {
  const [modal, setModal] = useState(false);
  const [staticD, setStatic] = useState(false);
  const [hideClose, setHideClose] = useState(true);

  return (
    <>
      <Modal
        open={modal}
        close={() => setModal(false)}
        showClose={hideClose}
        staticBackDrop={staticD}
      >
        {staticD && !hideClose
          ? "Hide close is functional for non-static modal"
          : staticD
          ? "Static Modal, Unable to close on outside click"
          : !hideClose ? "Close icon is hidden, click outside to close the modal": "Modal"}
      </Modal>
      <span
        className={`${
          staticD ? "text-gradient-effect" : ""
        }  general-hover-cursor`}
        onClick={() => setStatic(!staticD)}
      >
        Static Drop
      </span>
      <span
        className={`${
          !hideClose ? "text-gradient-effect" : ""
        }  general-hover-cursor`}
        onClick={() => setHideClose(!hideClose)}
      >
        Hide Close
      </span>
      <Button onClick={() => setModal(true)}>Open Modal</Button>
    </>
  );
};

export default ModalPreviewer;
