import React from "react";
import dynamic from "next/dynamic";
const ActionController = dynamic(
  () => import("../(views)/action-control"),
  { ssr: true }
);

const page = () => {
  return <ActionController />;
};

export default page;
