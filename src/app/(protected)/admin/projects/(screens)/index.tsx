"use client";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { adminRoutes, Mode } from "@/routes";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import ContentHeader from "@/shared/components/header/content-header";
import TabContentLoader from "@/shared/components/loaders-spinners/tab-content-loader";
import { Toggler } from "@/shared/components/central-fields-control-unit/input/toggler-check-radio";
import { usePostData } from "@/shared/firebase-services/mutations";
import Link from "next/link";
import { EditIcon, Eye, EyeSlash, Trash } from "@/shared/icons/common";
import InfoModal from "@/shared/components/modal/info";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import { useDeleteDocument } from "@/shared/firebase-services/useCollections";
const DataList = dynamic(
  () => import("@/shared/components/data-table/data-list"),
  { ssr: true }
);
const CreateEdit = dynamic(() => import("./create-edit"), {
  ssr: false,
  loading: () => <TabContentLoader />,
});

export const tabIds = {
  basicInfo: "basicInfo",
  imageGallery: "imageGallery",
  videoGallery: "videoGallery",
  detailedContent: "detailedContent",
};

const ProjectViews = () => {
  const { mutate } = usePostData(CollectionIDs.projects, () => {});
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const docId = searchParams?.get("documentId");
  const tabId = searchParams?.get("tabId");

  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    id: string | null;
    title: string;
    directory: string[];
  } | null>(null);

  const { isLoading: isProcessing, mutate: deleteDoc } = useDeleteDocument(
    CollectionIDs.projects,
    () => setConfirmationModal(null)
  );

  const mode = useMemo(() => {
    return searchParams?.get("mode") || Mode.list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("mode")]);

  const handleDeleteItem = (item: ProjectsData) => {
    let paths: any = [];

    if (item?.imageGallery?.banner_image?.directory) {
      paths.push(item?.imageGallery?.banner_image?.directory);
    }
    if (item?.imageGallery?.slider_images?.length! > 0) {
      item?.imageGallery?.slider_images?.forEach((obj) => {
        paths.push(obj?.directory);
      });
    }

    if (item.videoGallery?.banner_video?.directory) {
      paths.push(item.videoGallery.banner_video?.directory);
    }
    if (item.videoGallery?.demo_video?.directory!) {
      paths.push(item.videoGallery.demo_video?.directory);
    }
    setConfirmationModal({
      open: true,
      id: item?.id!,
      title: item?.title!,
      directory: paths,
    });
  };

  // dataList
  const dataList: TableDataKeyList[] = [
    {
      title: "Project",
      data_key: "basicInfo.title",
      cell: (item: ProjectsData) => item.basicInfo.title
    },
    {
      title: "Featured",
      data_key: "basicInfo.is_featured",
      cell: (item: ProjectsData) => {
        return (
          <Toggler
            value={item.basicInfo.is_featured}
            name={item.id + "is_featured"}
            onChange={() =>
              mutate({
                collectionId: CollectionIDs.projects,
                dataId: item.id,
                data: {
                  ...item,
                  basicInfo: {
                    ...item.basicInfo,
                    is_featured: !item.basicInfo.is_featured
                  }
                }
              })
            }
          />
        );
      }
    },
    {
      title: "Preview",
      data_key: "basicInfo.web_preview",
      cell: (item: ProjectsData) => {
        return (
          <Toggler
            value={item.basicInfo.web_preview}
            name={item.id + "web_preview"}
            onChange={() =>
              mutate({
                collectionId: CollectionIDs.projects,
                dataId: item.id,
                data: {
                  ...item,
                  basicInfo: {
                    ...item.basicInfo,
                    web_preview: !item.basicInfo.web_preview
                  }
                }
              })
            }
          />
        );
      }
    },
    {
      data_key: "actions",
      title: "Actions",
      headerCellCssClass: "justify-content-center",
      cell: (item: ProjectsData) => {
        return (
          <div className="d-flex gap-3 justify-content-center">
            <Link
              href={`${adminRoutes.projects}?mode=${Mode?.edit}&documentId=${item?.id}`}
            >
              <EditIcon className="text-warning general-hover-cursor" />
            </Link>
            <div
              onClick={() => {
                mutate({
                  collectionId: CollectionIDs.projects,
                  dataId: item?.id,
                  data: { ...item, is_archived: !item?.is_archived }
                });
              }}
            >
              <ConditionalRenderer
                condition={item?.is_archived}
                component={<Eye className="text-info general-hover-cursor" />}
              >
                <EyeSlash className="text-info general-hover-cursor" />
              </ConditionalRenderer>
            </div>
            <div
              onClick={() => {
                handleDeleteItem(item);
              }}
            >
              <Trash className="text-danger general-hover-cursor" />
            </div>
          </div>
        );
      }
    }
  ];

  if (
    mode !== Mode.list &&
    (!tabId || !Object.values(tabIds)?.includes(tabId!)) &&
    !docId
  ) {
    navigate?.replace(adminRoutes.projects);
  }

  return (
    <>
      <ConditionalRenderer
        condition={
          !mode || mode === Mode.list /*  || !searchParams?.get("tabId") */
        }
        component={
          <CreateEdit
            mode={mode}
            navigate={navigate}
            docId={docId!}
            tabId={tabId!}
          />
        }
      >
        <div className="p-3">
          <ContentHeader
            breadCrumbs={{
              parent: {
                title: "Projects",
                link: "",
              },
              childList: [
                {
                  title: "List",
                },
              ],
            }}
            buttonControl={{
              onClick: () => {
                navigate.push(
                  `${adminRoutes.projects}?mode=${Mode.create}&tabId=${tabIds?.basicInfo}`
                );
              },
              content: "Add",
              icon: "add",
            }}
          />
          <DataList
            collectionId={CollectionIDs.projects}
            tableDataKeyList={dataList}
            showActionsColumn={false}
          />
        </div>
      </ConditionalRenderer>
      <ConditionalRenderer condition={confirmationModal}>
        <InfoModal
          modalData={confirmationModal!}
          close={() => setConfirmationModal(null)}
          type="info"
          message={`Are you sure want to delete`}
          onSuccess={() =>
            deleteDoc({
              collectionType: CollectionIDs.projects,
              id: confirmationModal?.id!,
              directory: confirmationModal?.directory!,
            })
          }
        />
      </ConditionalRenderer>
      <ScreenLoader loading={isProcessing} />
    </>
  );
};

export default ProjectViews;
