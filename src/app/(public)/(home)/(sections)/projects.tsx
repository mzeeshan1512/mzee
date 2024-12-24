import ShowIf from "@/shared/components/show-if";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import ProjectCardRenderer from "./(components)/project-card-renderer";
import Link from "next/link";

const Projects = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.projects,
    conditions: {
      filters: [
        {
          field: "basicInfo.is_featured",
          operator: "==",
          value: true
        }
      ],
      orderByFields: {
        field: "modified_at",
        direction: "desc"
      },
      limit: 4
    }
  });
  await serverAction.getDocsCount(CollectionIDs.projects);

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
        conditionalRenderKey={
          serverAction?.data &&
          Array.isArray(serverAction?.data) &&
          serverAction?.data?.length > 0
        }
      >
        <ProjectCardRenderer projects={serverAction?.data} />
      </ShowIf>
      <ShowIf conditionalRenderKey={serverAction?.totalRecrods > 4}>
        <br className="block lg:hidden" />
        <br className="block lg:hidden" />
        <Link
          href="/projects"
          className="bg-primary-gradient hover:bg-primary-hover-gradient p-3 rounded-lg text-white"
        >
          Explore more
        </Link>
      </ShowIf>
    </SectionContainer>
  );
};

export default Projects;
