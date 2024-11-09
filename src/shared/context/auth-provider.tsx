"use client";
import { useState, useEffect } from "react";
import { getUserInfo } from "../utils/common";
import { AuthContext } from ".";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>({});
  const [sideBar, toggleSideBar] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [sideBarMenu, toggleSideBarMenu] = useState<boolean>(true);

  useEffect(() => {
    setUser(getUserInfo())
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        sideBar,
        toggleSideBar,
        activeTab,
        setActiveTab,
        sideBarMenu,
        toggleSideBarMenu,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
