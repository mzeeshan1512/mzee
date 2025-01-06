import React from "react";
import SectionContainer, {
  RenderErrorMessage
} from "./(components)/section-wrapper";
import SVGGradientBinder from "@/shared/components/svg-gradient-binder";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import Carousel from "@/shared/components/carousel";
import ResponsiveRenderer from "./(components)/responsive-renderer";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import ShowIf from "@/shared/components/show-if";

type Props = {
  service?: Services_TechsTools | null;
  toggleGradient?: boolean;
  loading?: boolean;
};

const ServiceCard = ({ service, toggleGradient }: Props) => {
  return (
    <div className="group flex flex-col h-full lg:flex-row justify-start items-start gap-3 shadow-md shadow-primary-200 lg:shadow-none border rounded-lg lg:border-none p-4 lg:p-0 w-full">
      <div
        className="flex justify-center sm:items-center w-full lg:w-[6.75rem]"
        // style={{ width: "6.75rem" }}
      >
        <SVGGradientBinder
          className="flex-grow inline transform transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
          {...service?.blob?.value?.svg?.props}
          linearGradientProps={{
            id: service?.id
          }}
          fill={toggleGradient ? "currentColor" : `url(#${service?.id})`}
        >
          <g
            dangerouslySetInnerHTML={{
              __html: service?.blob?.value?.svg?.code!
            }}
          />
          {/* <path d="M21 17.9995V19.9995H3V17.9995H21ZM17.4038 3.90332L22 8.49951L17.4038 13.0957L15.9896 11.6815L19.1716 8.49951L15.9896 5.31753L17.4038 3.90332ZM12 10.9995V12.9995H3V10.9995H12ZM12 3.99951V5.99951H3V3.99951H12Z" /> */}
        </SVGGradientBinder>
      </div>
      <div className="flex flex-col gap-4 prose !text-inherit">
        <h2
          className={`text-center lg:text-left ${
            toggleGradient ? "text-gradient" : "!text-inherit"
          }`}
        >
          {service?.title}
        </h2>
        <p>{service?.description}</p>
      </div>
    </div>
  );
};

const Services = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.services,
    conditions: {
      orderByFields: {
        field: "modified_at",
        direction: "asc"
      }
    }
  });
  return (
    <SectionContainer
      id={sectionIds.services}
      title={"Your Vision, My Expertise"}
      quotation="Transforming ideas into reality with expert development, automation, and IT solutions"
      className={
        " !bg-grid-pattern-light dark:!bg-grid-pattern-dark !bg-grid-size relative"
      }
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
        elseComponent={<RenderErrorMessage message="No Service Found" />}
      >
        <ResponsiveRenderer
          elseChildren={
            <div
              className="hidden lg:grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{
                gridTemplateColumns: `repeat(${
                  serverAction?.data?.length > 4
                    ? 4
                    : serverAction?.data?.length
                }, minmax(0, 1fr))`
              }}
            >
              {serverAction.data?.map(
                (service: Services_TechsTools, index: number) => (
                  <ServiceCard key={index} service={service} />
                )
              )}
            </div>
          }
        >
          <Carousel
            // autoPlay
            // infinite
            showDots={false}
            slidesProps={{
              className: "!p-2"
            }}
          >
            {serverAction.data?.map(
              (service: Services_TechsTools, index: number) => (
                <ServiceCard key={index} service={service} />
              )
            )}
          </Carousel>
        </ResponsiveRenderer>
      </ShowIf>
    </SectionContainer>
  );
};

export default Services;
