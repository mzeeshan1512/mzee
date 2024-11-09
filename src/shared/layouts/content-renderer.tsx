"use client";
import React from "react";
import { useNetwork } from "../hooks/use-network";
import Offline from "./offline-view";

const ContentRender = ({ children }: { children: React.ReactNode }) => {
  const { online } = useNetwork();
  return online ? children : <Offline />;
};

export default ContentRender;
