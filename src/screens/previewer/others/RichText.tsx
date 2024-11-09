import Button from "@/shared/components/button";
import RichTextEditor from "@/shared/components/central-fields-control-unit/rich-text";
import Modal from "@/shared/components/modal";
import React, { useState } from "react";

const RichText = () => {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState<any>("");
  return (
    <>
      <Modal open={modal} close={() => setModal(false)}>
        <RichTextEditor enablePreview value={value} onChange={setValue} />
      </Modal>
      <Button onClick={() => setModal(true)}>Open Modal</Button>
    </>
  );
};

export default RichText;
