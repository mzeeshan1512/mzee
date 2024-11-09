import React from "react";
import Modal from ".";
import { Warning } from "@/shared/icons/common";
import Button from "../button";

interface Props {
  modalData: GenericObject;
  variant?: ModalVariant;
  type?: "warning" | "info" | "error" | "success";
  message:string
  close: (e?:any) => void;
  onSuccess: (e?:any) => void;
}

const InfoModal = ({
    modalData,
  variant = "small",
  type = "info",
  message,
  close,
  onSuccess
}: Props) => {
  return (
    <Modal open={modalData?.open} close={close} variant={variant}>
      <div className="d-flex flex-column justify-content-center align-items-center w-full h-full gap-3">
        <Warning
          fill={
            type === "info" ? "#87ceeb" : 
            type === "error" ? "#eb000" : 
            type === "warning" ? "#eb000" : "#00eb00"
          }
        />
        <span className="fs-4 text-center">{message} <span className="text-danger">{modalData?.title}</span></span>
        <div className="d-flex gap-2">
            <Button variant="danger" onClick={close} >Cancel</Button>
            <Button variant="success" onClick={onSuccess} >Confirm</Button>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
