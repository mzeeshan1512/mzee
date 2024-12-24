import React from "react";
import SectionContainer from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";
import Image from "next/image";

const Reviews = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.reviews,
    conditions: {
      filters: [
        {
          field: "is_approved",
          operator: "==",
          value: true
        }
      ],
      orderByFields: {
        field: "modified_at",
        direction: "desc"
      },
      excludeFields: [
        "created_at",
        "latitude",
        "pak_time",
        "hostname",
        "is_approved",
        "is_archived",
        "date",
        "longitude",
        "modified_at",
        "policyAgreed",
        "ip",
        "country",
        "city",
        "region"
      ]
    }
  });
  return (
    <SectionContainer
      id={sectionIds.reviews}
      title="Stories & Experiences"
      quotation="Experiences that inspire, stories that connect."
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
      >
        <Carousel
          autoPlay
          infinite
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1
            }
          }}
          sliderContainerProps={{
            className: serverAction?.data > 1 ? "overflow-visible" : ""
          }}
        >
          {serverAction?.data.map((review: ReviewFeedback, index: number) => (
            <figure
              key={review.id + index}
              className="flex flex-col items-center justify-center m-2 border p-8 text-center rounded-lg shadow-md shadow-primary-200 glassomorhpic-effect-center-nav "
            >
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {review?.review}
                </h3>
                <p>{review?.xCollab}</p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <Image
                  className="rounded-full w-10 h-10 border p-2"
                  src={review?.fireBase_Image}
                  alt={review?.gmailName ?? review?.name}
                  width={50}
                  height={50}
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <strong>{review?.gmailName ?? review?.name}</strong>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    {review.designation} at {review?.organization}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </ShowIf>
    </SectionContainer>
  );
};

export default Reviews;
