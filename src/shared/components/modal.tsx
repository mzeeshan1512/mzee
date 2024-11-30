"use client";
import React from "react";
import { useDocumentEvent } from "../hooks/use-window-event";
import { Cross } from "../icon/common";
import ShowIf from "./show-if";

interface ContentContainerProps {
  modalContainerProps?: React.ComponentProps<"div">;
  backDropProps?: React.ComponentProps<"div">;
  titleProps?: React.ComponentProps<"h1">;
}

enum modalVariant {
  large = "large",
  small = "small",
  medium = "medium"
}

interface ModalProps extends ContentContainerProps {
  open: boolean;
  staticBackDrop?: boolean;
  showClose?: boolean;
  preventClose?: boolean;
  title?: string;
  close?: () => void;
  variant?: modalVariant;
  children?: React.ReactNode;
}

const Modal = ({
  open,
  staticBackDrop = false,
  showClose = true,
  preventClose = false,
  variant = modalVariant.medium,
  title,
  close = () => {},
  children,
  modalContainerProps,
  backDropProps,
  titleProps
}: ModalProps) => {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: React.MouseEvent | Event): void => {
    if (!preventClose && !staticBackDrop) {
      const targetElement = event.target as HTMLElement | null;
      const targetRole =
        targetElement?.getAttribute("tabIndex") ||
        targetElement?.getAttribute("role");

      if (targetRole === "-1" || targetRole === "option") {
        return;
      } else if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }
  };

  const modalVariantStyles: Record<modalVariant, React.CSSProperties> = {
    [modalVariant.large]: {
      width: "clamp(300px, 80vw, 90vw)",
      height: " clamp(300px, 80vh, 90vh)"
    },
    [modalVariant.medium]: {
      width: "clamp(300px, 60vw, 70vw)",
      height: "clamp(300px, 60vh, 70vh)"
    },
    [modalVariant.small]: {
      width: "clamp(300px, 40vw, 50vw)",
      height: "clamp(300px, 40vh, 50vh)"
    }
  };

  // Attach event listener with type safety
  useDocumentEvent("click", handleClickOutside);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 h-screen w-screen overflow-hidden flex justify-center items-center">
      <div
        {...backDropProps}
        className={
          "fixed inset-0 bg-gray-400 bg-opacity-50 h-screen w-screen overflow-hidden " +
            backDropProps?.className || ""
        }
      />
      <div
        {...modalContainerProps}
        ref={modalRef}
        className={`relative bg-[var(--section-odd-bg)] ${
          modalContainerProps?.className || ""
        } border rounded-lg shadow-xl lg:max-w-[80%]
  lg:max-h-[calc(100vh-100px)]
  max-w-[80%] 
  max-h-[calc(100vh-100px)]
  min-w-[40%] 
  min-h-[200px] 
  xl:max-w-[80%] overflow-auto`}
        style={{
          ...modalContainerProps?.style,
          ...modalVariantStyles[variant]
        }}
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <ShowIf conditionalRenderKey={title || showClose}>
          <div className="sticky top-0 inset-x-0 z-10 border p-4 shadow bg-[var(--section-even-bg)] flex justify-between items-center">
            <h1
              {...titleProps}
              className={
                "text-[clamp(16px,3vw,1vw+15px)] !font-semibold " +
                (titleProps?.className || "")
              }
            >
              {title}
            </h1>
            <Cross
              onClick={close}
              className="hover:text-primary-500 cursor-pointer"
            />
          </div>
        </ShowIf>
        {children ?? (
          <div className="flex justify-center items-center">Empty Modal</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Modal);

export { modalVariant };

export type { ContentContainerProps, ModalProps };
