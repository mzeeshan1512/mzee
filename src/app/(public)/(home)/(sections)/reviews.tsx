import React from "react";
import SectionContainer, {
  RenderErrorMessage
} from "./(components)/section-wrapper";
import { sectionIds } from "@/shared/constants-enums/navigation-list";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import ShowIf from "@/shared/components/show-if";
import Carousel from "@/shared/components/carousel";
import Image from "next/image";
import TrustedRedirect from "@/shared/components/trusted-redirect";

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
        direction: "asc"
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
        elseComponent={
          <RenderErrorMessage message="No Review/Feedback Found" />
        }
      >
        <Carousel
          autoPlay
          infinite
          draggable={false}
          showArrows={false}
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
            className: "items-strech"
          }}
        >
          {serverAction?.data.map((review: ReviewFeedback, index: number) => (
            <figure
              key={review.id + index}
              className="flex flex-col !min-h-60 h-full items-center justify-center gap-4 m-2 border p-8 text-center rounded-lg shadow-md shadow-primary-200 glassomorhpic-effect-center-nav "
            >
              <blockquote className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
                <h3 className="text-lg font-semibold">{review?.review}</h3>
                <p className="mt-4">{review?.x_colab}</p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <Image
                  className="rounded-full w-20 h-20 p-2 drop-shadow-md "
                  src={review?.firebase_image}
                  alt={review?.gmail_name ?? review?.name}
                  width={80}
                  height={80}
                />
                <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3 hover-bottom-outline">
                  <TrustedRedirect
                    href={review?.linkedin_profile}
                    symbol
                    className="cursor-pointer !font-normal hover:!font-semibold"
                  >
                    <strong>{review?.gmail_name ?? review?.name}</strong>
                  </TrustedRedirect>
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
