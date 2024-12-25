"use client";
import React, { useState } from "react";
import { InternalPreview } from "../icon/common";
import Modal from "./modal";

const ProjectDemoVdeo = ({ url, title }: blobSrc & { title: string }) => {
  const [showDemo, toggleDemo] = useState<boolean>(false);
  return (
    <>
      <InternalPreview onClick={() => toggleDemo(true)} />
      <Modal
        open={showDemo}
        close={() => toggleDemo(false)}
        title={`${title} Demo Video`}
      >
        <video
          autoPlay={showDemo}
          muted
          src={url}
          className="w-full h-[80%] aspect-video"
        ></video>
      </Modal>
    </>
  );
};

export default ProjectDemoVdeo;
