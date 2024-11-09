"use client";
import React from "react";
import ProfileDropDown from "@/shared/components/profile-drop-down";
import { GreetingClock } from "@/shared/components/clock";

const HeaderCallback = () => {
  return (
    <div className="ms-3 d-flex flex-grow-1 justify-content-end justify-content-md-between align-items-center">
      <div className="d-none d-md-block" id="header-call-back-content">
        <GreetingClock/>
      </div>
      <ProfileDropDown />
    </div>
  );
};

export default HeaderCallback;
