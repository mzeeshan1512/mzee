import React from "react";
import ShowIf from "@/shared/components/show-if";
import Main from "./(sections)/main";
import About from "./(sections)/about";
import Services from "./(sections)/services";
import TechGridGlobeContainer from "./(sections)/(components)/tech-stack-grid-globe";
import TechHexGrid3D from "./(sections)/(components)/tech-stack-grid-globe/tech-grid-globe";

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
    component: <TechHexGrid3D />,
    show: false
  }
];

const page = () => {
  return componentLists?.map((item, index) => (
    <ShowIf key={index} conditionalRenderKey={item.show}>
      {item.component}
    </ShowIf>
  ));
};

export default page;
