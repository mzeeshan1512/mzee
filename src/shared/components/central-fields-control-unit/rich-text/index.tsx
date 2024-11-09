"use state";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { RichTextProps } from "@/shared/types/fields";
import Modal from "@/shared/components/modal";
import Button from "@/shared/components/button";
import { Row, Col } from "@/shared/components/row-cols";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { FormSkeleton } from "@/shared/components/loaders-spinners/skeleton";
import { formats, modules as coreModules } from "./config";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <FormSkeleton height={80} />,
});
const RichTexPreviewer = dynamic(() => import("./previewer"), { ssr: false });

const RichTextEditor = React.forwardRef(
  (props: RichTextProps, ref) => {
    const [isModal, toggleModal] = useState<boolean>(false);
    const validInvalidClass = () => {
      if (props.inValid) {
        return "select-invalid";
      }
      if (props.isValid) {
        return "select-valid";
      }
      return "";
    };

    const ModalPreviewer = () => {
      return (
        <Modal
          open={isModal}
          close={() => toggleModal(false)}
          title="Rich Text Previewer"
        >
          <div className="mt-2 border border-secondary rounded p-2">
            <RichTexPreviewer
              markdown={props?.value! || props?.placeholder! || "Previewer"}
            />
          </div>
        </Modal>
      );
    };

    const RenderRichTexPreviewer = () => {
      return (
        <Col lg={6} className="my-1">
          <div
            className={`border ${validInvalidClass()} flex flex-col ${
              props?.disabled ? "disabled" : ""
            } rounded`}
          >
            <h3 className={"border-bottom border-inherit px-2 p-1"}>
              Rich Text Previewer
            </h3>
            <div className="flex-grow-1 px-2 py-1">
              <RichTexPreviewer
                markdown={props?.value! || props?.placeholder! || "Previewer"}
              />
            </div>
          </div>
        </Col>
      );
    };

    return (
      <>
        <Row className="my-1">
          <Col
            lg={!props?.modalPreview && props?.enablePreview ? 6 : 12}
            className={props?.enablePreview ? "my-1" : "m-0"}
          >
            <ReactQuill
              theme="snow"
              {...props}
              formats={props?.format || formats}
              modules={props?.modules || coreModules}
              className={`${validInvalidClass()} ${
                props?.disabled ? "disabled" : ""
              } rounded`}
              readOnly={props?.disabled}
            />
          </Col>
          <ConditionalRenderer
            condition={!props.modalPreview && props.enablePreview}
          >
            <RenderRichTexPreviewer />
          </ConditionalRenderer>
        </Row>
        <ConditionalRenderer condition={props?.modalPreview}>
          <div className="my-2">
            <Button onClick={() => toggleModal(true)}>Preview</Button>
          </div>
          <ModalPreviewer />
        </ConditionalRenderer>
      </>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
