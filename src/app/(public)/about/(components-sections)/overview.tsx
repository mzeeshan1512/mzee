import React from "react";
import Image from "next/image";
import SocialIcons from "@/shared/components/social-share";
import { fetchRecordsOnServer } from "@/shared/firebase/server-actions";
import { CollectionIDs } from "@/shared/firebase/collection-ids";
import ContactModal from "@/shared/components/contact-form/contact-modal";
import { chatLogo } from "@/shared/app-config";
import DownloadResume from "@/shared/components/download-resume";

type myInfo = {
  skills_loop: {
    value: string;
    label: string;
  }[];
  user_avatar: {
    src: blobSrc;
    svg?: blobSvg;
    directory?: string;
  };
  id: string;
  bio: string;
  user_name: string;
  location: string;
};

const Overview = async () => {
  const serverAction = fetchRecordsOnServer();
  await serverAction.getDocuments({
    collectionId: CollectionIDs.myInfo,
    isSingleRecord: true
  });
  const record: myInfo = serverAction.data;
  if (!record || Object.keys(record)?.length < 1) {
    return null;
  }
  return (
    <>
      <div className="order-1 md:order-1">
        <div className="p-2 mx-auto md:sticky md:top-0 md:inset-x-0 md:overflow-hidden">
          <div className="flex flex-col gap-3 justify-center w-full items-center">
            <Image
              src={record.user_avatar.src?.url ?? chatLogo}
              alt={process.env.NEXT_PUBLIC_APP_Name || ""}
              width={100}
              height={100}
              className="w-1/2 md:w-3/4 md:h-3/4 p-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 drop-shadow-[-1px_2px_5px_var(--secondary)] dark:drop-shadow-[-1px_2px_5px_var(--primary)] aspect-square transition-all ease-in-out hover:scale-110"
              data-aos="zoom-in"
              data-aos-duration="1000"
            />
            <h1 className="text-[clamp(15px,2vw,2vw+15px)] text-center">
              <b
                className="text-gradient"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                {process.env.NEXT_PUBLIC_APP_Name}
              </b>
            </h1>
            <p
              className="text-center !text-gray-400"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              Software Engineer
            </p>
            <div data-aos="zoom-in" data-aos-duration="1000">
              <SocialIcons className="flex-wrap !gap-2" />
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="zoom-in"
        // data-aos-duration="1000"
        className="order-2 md:order-2 md:col-span-2 w-[95%] flex flex-col gap-4 "
      >
        <article
          dangerouslySetInnerHTML={{
            __html: decodeURIComponent(escape(atob(record?.bio)))
          }}
        />
        <div className="flex gap-4">
          <ContactModal />
          <DownloadResume />
        </div>
      </div>
    </>
  );
};

export default Overview;
