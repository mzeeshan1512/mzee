"use client";
import React from "react";
import { navLinks } from "@/shared/constants/navigation-list";
import LayoutController from "@/shared/layouts";

// components
import ParticleAnimation from "@/shared/components/particles-animation";
import ToolTipPreviewer from "./others/ToolTipPreviewer";
import ButtonPreviewer from "./others/ButtonPreviewer";
import ModalPreviewer from "./others/ModalPreviewer";
import InputPreviewer from "./others/InputPreviewer";
import BreadCrumbPreviewer from "./others/BreadCrumbPreviewer";
import RichText from "./others/RichText";


const Previewer = () => {
  const list: {
    title: string;
    Component: any;
  }[] = [
    {
      title: "Particle Animation",
      Component: ParticleAnimation,
    },
    {
      title: "Breadcrumbs",
      Component: BreadCrumbPreviewer,
    },
    {
      title: "Tool tip",
      Component: ToolTipPreviewer,
    },
    {
      title: "Button",
      Component: ButtonPreviewer,
    },
    {
      title: "Modal",
      Component: ModalPreviewer,
    },
    {
      title: "Input Component",
      Component: InputPreviewer,
    },
    {
      title: "Rich Text Editor",
      Component: RichText,
    },
  ];
  
  return (
    <>
    <LayoutController navMenuList={navLinks} isStaticPageNavigation>
      <div className="temp container">
        {list?.map((item, index) => (
          <div className="block glass" key={index}>
            <div className="d-flex flex-column gap-4">
            {React.createElement(item?.Component)}
            </div>
            <span>{item?.title}</span>
          </div>
        ))}
      </div>
    </LayoutController>
    </>
  );
};

export default Previewer;
