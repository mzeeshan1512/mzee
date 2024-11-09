"use client";
import React, {useMemo } from "react";
import Image from "next/image";
import { chatLogo } from "@/shared/config";
import { getUserInfo } from "@/shared/utils/common";
import useAuth from "@/shared/firebase-services/useAuth";
import Spinner from "./loaders-spinners/spinner";

const ProfileDropDown = () => {
  const { handleSignOut,isProcessing} = useAuth();
  const user = useMemo(() => {
    return getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const list = [
    {
      name: "Profile",
      action: () => {},
    },
    {
      name: "LogOut",
      action: () => 
        handleSignOut()
    },
  ];
  return (
    <div className="profile general-hover-cursor">
      <div className="profile-container">
        <Image
          src={user?.picture || chatLogo}
          alt="Avatar"
          className="avatar"
          width={20}
          height={20}
        />
        <span className="ms-2 d-none d-md-block">{user?.name}</span>
      </div>
      <div className={`drop-down theme-bg shadow`}>
        {list?.map((item, index) => (
          <span key={index} className="item" onClick={item?.action}>
            {item?.name}
          </span>
        ))}
        {
          isProcessing && 
          <span className="item" >
          <Spinner />
        </span>
        }
      </div>
    </div>
  );
};

export default ProfileDropDown;
