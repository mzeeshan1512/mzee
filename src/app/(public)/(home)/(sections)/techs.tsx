import React from "react";
import { RenderSvgAsDangerouslySetInnerHTML } from "@/shared/components/svg-gradient-binder";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import Carousel from "@/shared/components/carousel";
import ShowIf from "@/shared/components/show-if";
import SectionContainer, {
  RenderErrorMessage
} from "./(components)/section-wrapper";
import ResponsiveRenderer from "./(components)/responsive-renderer";

const Tech = ({
  tech,
  displayLabel
}: {
  tech: Services_TechsTools;
  displayLabel?: boolean;
}) => {
  return (
    <div
      className="bg-transparent cursor-default p-5 flex justify-center gap-2 items-center text-4xl border rounded-xl lg:border-none hover:scale-125 hover:border-none"
      data-aos="flip-up"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      title={tech?.blob?.label}
    >
      <RenderSvgAsDangerouslySetInnerHTML
        {...tech?.blob?.value?.svg?.props}
        width={80}
        height={80}
        className="shrink-0 drop-shadow-[0_2px_1px_var(--secondary)] dark:drop-shadow-[0_2px_1px_var(--primary)]"
        title={tech?.blob?.label}
        dangerouslySetInnerHTML={{
          __html: tech?.blob?.value?.svg?.code
        }}
      />
      {displayLabel && (
        <small className="capitalize">{tech?.blob?.label}</small>
      )}
    </div>
  );
};

const TechStack = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.technologies,
    conditions: {
      orderByFields: {
        field: "blob.label",
        direction: "asc"
      }
    }
  });
  return (
    <SectionContainer
      id={sectionIds.tech}
      title="Tools Behind the Magic" /* "Tech Stack That Drives Excellence" */
      quotation="Excellence isn't built in a day; it's engineered with the right tools." /* "Precision, performance, and power —stacked for success." */
      containerProps={{
        className: "py-4 my-4"
      }}
    >
      <ShowIf
        conditionalRenderKey={
          serverAction?.data &&
          Array.isArray(serverAction?.data) &&
          serverAction?.data?.length > 0
        }
        elseComponent={<RenderErrorMessage message="No Tech/Tool Found" />}
      >
        <ResponsiveRenderer
          elseChildren={
            /* hidden lg:grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */
            <div className="flex gap-4 justify-evenly items-center flex-wrap">
              {serverAction.data?.map(
                (tech: Services_TechsTools, index: number) => (
                  <Tech key={index} tech={tech} />
                )
              )}
            </div>
          }
        >
          <Carousel
            showArrows={false}
            autoPlay
            infinite
            slidesProps={{
              className: "p-2"
            }}
            showDots={false}
          >
            {serverAction.data?.map(
              (tech: Services_TechsTools, index: number) => (
                <Tech key={index} tech={tech} displayLabel />
              )
            )}
          </Carousel>
        </ResponsiveRenderer>
      </ShowIf>
    </SectionContainer>
  );
};

export default TechStack;
