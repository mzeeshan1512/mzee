import React from "react";
import ShowIf from "@/shared/components/show-if";
import Main from "./(sections)/main";
import About from "./(sections)/about";
import Services from "./(sections)/services";
import Techs from "./(sections)/techs";
import Projects from "./(sections)/projects";
import ContactUs from "./(sections)/contact-us";

export type ContentProps = {
  hide?: boolean;
};

const componentLists = [
  {
    component: <Main />,
    show: false
  },
  {
    component: <About />,
    show: false
  },
  {
    component: <Services />,
    show: false
  },
  {
    component: <Techs />,
    show: false
  },
  {
    component: <Projects />,
    show: false
  },
  {
    component: <ContactUs />,
    show: false
  }
];

const page = () => {
  return componentLists?.map((item, index) => (
    <ShowIf key={index} conditionalRenderKey={item?.show || false}>
      {item?.component ?? null}
    </ShowIf>
  ));
};

export default page;
