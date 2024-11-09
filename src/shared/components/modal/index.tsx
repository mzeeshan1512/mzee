import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ConditionalRenderer from "../conditional-renderer";
import { Cross } from "../../icons/common";

interface Props {
  open: boolean;
  staticBackDrop?: boolean;
  showClose?: boolean;
  preventClose?: boolean;
  noDefaultClass?: boolean;
  ContentClass?: string;
  title?: string;
  subtitle?: string;
  close?: () => void;
  variant?: ModalVariant
  children?: React.ReactNode;
}

const Modal = ({
  open,
  staticBackDrop = false,
  showClose = true,
  preventClose = false,
  noDefaultClass = false,
  ContentClass ="",
  variant = "medium",
  title,
  subtitle,
  close = () => {},
  children,
}: Props) => {
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!preventClose && !staticBackDrop) {
        const targetRole =
          (event?.target as HTMLElement)?.getAttribute("tabIndex") ||
          (event?.target as HTMLElement)?.getAttribute("role");
        if ((targetRole && targetRole === "-1") || targetRole === "option") {
          return;
        } else if (
          modalRef?.current &&
          !modalRef.current.contains(event?.target as Node)
        ) {
          close();
        }
      }
    };

    if (open) {
      document?.addEventListener("click", handleClickOutside);
      document?.body?.classList.add("no-scroll");
    } else document?.body?.classList.remove("no-scroll");
    return () => {
      document?.removeEventListener("click", handleClickOutside);
      document?.body?.classList?.remove("no-scroll");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) {
    return null;
  }

  const modalContent = (
    <div className="custom-modal">
      <div
        ref={modalRef}
        className={
          noDefaultClass
            ? ContentClass
            : `theme-bg shadow custom-modal-content-container ${variant} ${ContentClass}`
        }
        id="modal"
      >
        <ConditionalRenderer
          condition={!preventClose && (showClose || staticBackDrop)}
        >
          <div className="close">
            <Cross className="general-hover-cursor" onClick={() => close()} />
          </div>
        </ConditionalRenderer>
        <ConditionalRenderer condition={title || subtitle}>
          <div className="d-flex flex-column">
            <ConditionalRenderer condition={title}>
              <h4 className="m-0">{title}</h4>
            </ConditionalRenderer>
            <ConditionalRenderer condition={subtitle}>
              <p>{subtitle}</p>
            </ConditionalRenderer>
          </div>
        </ConditionalRenderer>
        <ConditionalRenderer condition={children}>
          {children}
        </ConditionalRenderer>
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document?.body);
};

export default React.memo(Modal);
