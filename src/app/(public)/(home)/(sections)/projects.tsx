"use client";
import {
  ProjectDetailedInfoCard,
  ProjectInfoCard
} from "@/shared/components/project-card";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";
import Link from "next/link";

const Projects = () => {
  const projects = [
    {
      title: "My Project",
      description: "This is a description of the project.",
      techList: ["React", "Tailwind", "Next.js"],
      link: "https://example.com",
      image: require("@/assets/content/about.png")
    },
    {
      title: "My Project",
      description: "This is a description of the project.",
      techList: ["React", "Tailwind", "Next.js"],
      link: "https://example.com",
      image: require("@/assets/content/about.png")
    },
    {
      title: "My Project",
      description: "This is a description of the project.",
      techList: ["React", "Tailwind", "Next.js"],
      link: "https://example.com",
      image: require("@/assets/content/about.png")
    },
    {
      title: "My Project",
      description: "This is a description of the project.",
      techList: ["React", "Tailwind", "Next.js"],
      link: "https://example.com",
      image: require("@/assets/content/about.png")
    }
    // Add more projects as needed
  ];
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

  const RenderProjectComponent = ({ project, index }: any) => {
    return (
      <Component
        key={index}
        title={project.title}
        description={project.description}
        techList={project.techList}
        link={project.link}
        image={project.image}
        i={index}
      />
    );
  };

  const LoopProjects = () => {
    return projects.map((project, index) => (
      <RenderProjectComponent key={index} index={index} project={project} />
    ));
  };

  return (
    <SectionContainer
      id={sectionIds.projects}
      title="Turning Ideas into Reality"
      quotation="From vision to fruition, we make it happen"
      containerProps={{
        className: "pt-4 mt-4 mb-8"
      }}
    >
      <ShowIf
        conditionalRenderKey={smallDeviceMedia767}
        elseComponent={
          <ShowIf
            conditionalRenderKey={mediumDeviceMedia1024}
            elseComponent={<LoopProjects />}
          >
            <div className="grid grid-cols-2 gap-3">
              <LoopProjects />
            </div>
          </ShowIf>
        }
      >
        <Carousel
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 3
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          }}
          autoPlay
          infinite
        >
          {projects.map((project, index) => (
            <RenderProjectComponent
              key={index}
              index={index}
              project={project}
            />
          ))}
        </Carousel>
      </ShowIf>
      <Link
        href="/projects"
        className="bg-primary-gradient hover:bg-primary-hover-gradient p-3 rounded-lg text-white"
      >
        Explore more
      </Link>
    </SectionContainer>
  );
};

export default Projects;
