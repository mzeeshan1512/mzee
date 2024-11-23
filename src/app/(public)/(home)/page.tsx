import React from "react";
import ShowIf from "@/shared/components/show-if";
import Main from "./(sections)/main";
import About from "./(sections)/about";
import Services from "./(sections)/services";
import Techs from "./(sections)/techs";

export type ContentProps = {
  hide?: boolean;
};

const componentLists = [
  {
    component: <Main />,
    show: true
  },
  {
    component: <About />,
    show: true
  },
  {
    component: <Services />,
    show: true
  },
  {
    component: <Techs />,
    show: true
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
