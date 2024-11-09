import dynamic from "next/dynamic";

const ProjectView = dynamic(() => import("@/app/(protected)/admin/projects/(screens)"), {
  ssr: true,
});

const Projects = () => {
  return <ProjectView/>;
};

export default Projects;
