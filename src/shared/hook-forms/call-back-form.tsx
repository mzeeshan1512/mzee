"use client";
import React, { useState } from "react";
import ConditionalRenderer from "../components/conditional-renderer";
import { usePostData } from "../firebase-services/mutations";
import IconLabel from "../components/icon-label";
import Modal from "../components/modal";
import HookForms, { HookFormProps } from ".";

const CallBackForm = (
  props: HookFormProps & {
    validationSchema?: any;
    formType?: "field-form" | "file-uploader-form" | null;
    callBackLabel: string;
    modalTile?: string;
  }
) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isLoading: isProcessing, mutate } = usePostData(
    props.collectionId,
    () => setShowModal(false)
  );
  return (
    <>
      <span
        className="general-hover-cursor border-bottom border-hover-cursor"
        onClick={() => setShowModal(true)}
      >
        <IconLabel icon="add" title={props.callBackLabel} />
      </span>
      <ConditionalRenderer condition={showModal}>
        <Modal
          open={showModal}
          close={() => setShowModal(false)}
          title={props?.modalTile || props?.callBackLabel}
          staticBackDrop
        >
          <div
            className="my-2 position-relative"
            style={{
              height: "85%",
              overflow: "auto",
            }}
          >
            <HookForms
              {...props}
              formType={props?.formType! || "field-form"}
              formRowClassName="m-l-r-0"
              isInProcess={isProcessing}
              onSaveCallBack={(e) => {
                mutate({
                  collectionId: props.collectionId,
                  data: { ...e },
                });
              }}
              showSubmitFormButton
            />
          </div>
        </Modal>
      </ConditionalRenderer>
    </>
  );
};

export default CallBackForm;
