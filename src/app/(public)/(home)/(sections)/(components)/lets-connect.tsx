"use client";
import React from "react";
import Button, { BlendMode } from "@/shared/components/button";
import { useScrollIntoView } from "@/shared/hooks/use-scroll-into-view/use-scroll-into-view";
import { sectionIds } from "@/shared/constants-enums/navigation-list";

const LetsConnect = () => {
  const { scrollIntoView } = useScrollIntoView({
    targetId: sectionIds.contact
  });
  return (
    <Button
      blendMode={BlendMode.GRADIENT}
      className="bg-primary-gradient hover:bg-primary-hover-gradient p-3"
      onClick={() => scrollIntoView()}
    >
      {"Let's Connect"}
    </Button>
  );
};

export default LetsConnect;
