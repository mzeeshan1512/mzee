import React from "react";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";
import { ProjectInfoCard } from "@/shared/components/project-card";
import Image from "next/image";
import NoDataImg from "@/assets/content/not_found.png";

enum ProjectCategoryList {
  featured = "Featured",
  worthy = "Worthy",
  notWorthy = "Not Worthy",
  youtubeCloned = "Youtube Cloned",
  cloned = "Cloned",
  others = "Others"
}

const groupedByCategory = (
  data: Record<string, any>,
  project: ProjectsData
): Record<string, any> => {
  const groupedData: Record<string, any> = data;
  const category = project?.basicInfo.project_category?.label ?? "Others";
  if (
    project?.basicInfo?.is_featured ||
    category === ProjectCategoryList.featured
  ) {
    if (!("Featured" in groupedData)) {
      groupedData["Featured"] = [];
    }
    groupedData["Featured"].push(project);
  } else {
    if (!groupedData[`${category}`]) groupedData[`${category}`] = [];
    groupedData[category]?.push(project);
  }
  return groupedData;
};


const Projects = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.projects,
    groupedData: {
      customGroupedCallBack: groupedByCategory as any
    }
  });
  return (
    <main className="container mx-auto mb-4 md:my-4 w-calc-10 block md:flex rounded items-start min-h-[calc(100vh-200px)]">
      {Object.values(ProjectCategoryList).map((category) => {
        return (
          <ShowIf
            key={category}
            conditionalRenderKey={
              serverAction?.data &&
              Array.isArray(serverAction?.data[category]) &&
              serverAction?.data[category]?.length > 0
            }
          >
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-lg">
                <i>{category}</i>
              </h1>
              <Carousel autoPlay infinite>
                {serverAction?.data[category]?.map(
                  (project: ProjectsData, index: number) => (
                    <ProjectInfoCard
                      key={index}
                      i={index}
                      {...project}
                      disableHoverScale
                    />
                  )
                )}
              </Carousel>
            </div>
          </ShowIf>
        );
      })}
      <ShowIf
        conditionalRenderKey={Object.keys(serverAction?.data)?.length < 1}
      >
        <div className="flex justify-center items-center h-[70vh] w-full text-slate-600 md:col-span-3">
          <Image src={NoDataImg} alt="" />
        </div>
      </ShowIf>
    </main>
  );
};

export default Projects;
