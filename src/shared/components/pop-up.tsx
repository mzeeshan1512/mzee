/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerProps?: React.ComponentProps<"div">;
}

const Popup = ({ isOpen, onClose, children, containerProps }: PopupProps) => {
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div {...containerProps} ref={popupRef}>
      {children}
    </div>
  );
};

export default Popup;
