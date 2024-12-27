"use client";
import React from "react";
import {
  ProjectDetailedInfoCard,
  ProjectInfoCard
} from "@/shared/components/project-card";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";

const ProjectCardRenderer = ({
  projects
}: {
  projects: ProjectsBasicInfo[];
}) => {
  const mediumDeviceMedia1024 = useMediaQuery("(max-width: 1024px)", true, {
    getInitialValueInEffect: false
  });
  const smallDeviceMedia767 = useMediaQuery("(max-width: 767px)", true, {
    getInitialValueInEffect: false
  });

  const Component =
    smallDeviceMedia767 || mediumDeviceMedia1024
      ? ProjectInfoCard
      : ProjectDetailedInfoCard;

  const RenderProjectComponent = ({
    project,
    index,
    disableHoverScale
  }: any) => {
    return (
      <Component
        key={index}
        i={index}
        {...project}
        disableHoverScale={disableHoverScale}
      />
    );
  };

  const LoopProjects = () => {
    return projects.map((project, index) => (
      <RenderProjectComponent key={index} index={index} project={project} />
    ));
  };
  return (
    <ShowIf
      conditionalRenderKey={smallDeviceMedia767}
      elseComponent={
        <ShowIf
          conditionalRenderKey={mediumDeviceMedia1024}
          elseComponent={<LoopProjects />}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <LoopProjects />
          </div>
        </ShowIf>
      }
    >
      <Carousel autoPlay infinite>
        {projects.map((project, index) => (
          <RenderProjectComponent
            key={index}
            index={index}
            project={project}
            disableHoverScale
          />
        ))}
      </Carousel>
    </ShowIf>
  );
};

export default ProjectCardRenderer;
