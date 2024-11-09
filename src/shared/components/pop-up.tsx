"use client";
import React, { useEffect, useRef } from "react";

const Popup = ({ isOpen, onClose, children }: {
    isOpen:boolean, onClose:(e?:any)=>void, children:React.ReactNode
}) => {
    const popupRef = useRef<any>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return <div ref={popupRef}>{children}</div>;
};

export default Popup;
