"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { chatLogo, ChatBG } from "@/shared/config";
import { Cross, SendButton as Send } from "@/shared/icons/common";
import { WhatsApp } from "@/shared/icons/social";
import Popup from "@/shared/components/pop-up";

const WhatsAppChatBox = ({
  show,
  setShow,
  name,
  message,
  response,
  logo,
}: {
  show: boolean;
  setShow: (e: boolean) => void;
  name: string;
  message: string;
  response: string;
  logo: any;
}) => {
  let chatMessage = message.split("\n");
  const [request, setRequest] = useState<string | null>("");

  const handleClose = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    setShow(false);
    setRequest(null);
  };

  useEffect(() => {
    return () => {
      setRequest(null);
    };
  }, []);

  return (
    <Popup isOpen={show} onClose={handleClose}>
      <div className={`whats-app-chat-box ${show ? "show" : ""}`}>
        {/* header */}
        <div className="chat-header">
          {/* logo name */}
          <div className="logo-container">
            <Image src={logo} alt="" width={35} height={35} />
            <div className="text-container">
              <span>
                {name?.length > 8 ? name?.substring(0, 8) + "..." : name}
              </span>
              <small>{response}</small>
            </div>
          </div>
          <Cross
            size={25}
            className="general-hover-cursor"
            onClick={handleClose}
          />
        </div>
        {/* chat container */}
        <div
          className="chat-container"
          style={{
            backgroundImage: `url(${ChatBG?.src})`,
          }}
        >
          {/* message */}
          <div className="message-container">
            <p className="message-header">
              {name?.length > 16 ? name?.substring(0, 16) + "..." : name}
            </p>
            <div className="message">
              {chatMessage.map((data, index) => (
                <p key={index}>{data}</p>
              ))}
            </div>
          </div>
          {/* input */}
          <div className="input-container">
            <textarea
              placeholder="Message"
              value={request!}
              rows={2}
              cols={10}
              onChange={(e) => {
                e?.preventDefault();
                e?.stopPropagation();
                setRequest(e.target.value);
              }}
            />
            {/* eslint-disable-next-line */}
            <a
              href={`${process.env.NEXT_PUBLIC_WHATSAPP}?text=${request}`}
              target="_blank"
            >
              <div className="icon" onClick={handleClose}>
                <Send size={15} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </Popup>
  );
};

const WhatsAppChat = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <WhatsApp
        size={25}
        className="cursor-pointer"
        onClick={() => setShow(!show)}
      />

      <WhatsAppChatBox
        show={show}
        setShow={(e) => setShow(e)}
        logo={chatLogo}
        name={`Muhammad Zeeshan`}
        response={"Typically reply with in a day"}
        message={
          "Hi there!\nI hope you're doing well.\nHow can I assist you today?"
        }
      />
    </div>
  );
};

export default WhatsAppChat;
