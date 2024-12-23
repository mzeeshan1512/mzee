"use client";
import Button from "@/shared/components/button";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import DataList from "@/shared/components/data-table/data-list";
import ContentHeader from "@/shared/components/header/content-header";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
import Modal from "@/shared/components/modal";
import InfoModal from "@/shared/components/modal/info";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { usePostData } from "@/shared/firebase-services/mutations";
import { useDeleteDocument } from "@/shared/firebase-services/useCollections";
import HookForms from "@/shared/hook-forms";
import { EditIcon, Eye, EyeSlash, Trash } from "@/shared/icons/common";
import { formFieldsList } from "@/shared/types/fields";
import { parseObjectValues } from "@/shared/utils/common";
import Image from "next/image";
import React, { useState } from "react";

const ReviewsFeedBacks = () => {
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    id: string | null;
    title: string;
    directory: string[];
  } | null>(null);
  const [modalData, setModalData] = useState<{
    open: boolean;
    data: ReviewFeedback;
  } | null>(null);
  const { mutate, isLoading: isUpdating } = usePostData(
    CollectionIDs?.reviews,
    () => {}
  );
  const { isLoading: isProcessing, mutate: deleteDoc } = useDeleteDocument(
    CollectionIDs?.reviews,
    () => setConfirmationModal(null)
  );
  const handleDeleteItem = (item: any) => {
    let paths: any = [];

    if (item?.avatar_directory) {
      paths.push(item?.avatar_directory);
    }

    setConfirmationModal({
      open: true,
      id: item?.id!,
      title: item?.title!,
      directory: paths
    });
  };
  const dataList: TableDataKeyList[] = [
    {
      title: "Avatar",
      data_key: "",
      cell: (item: ReviewFeedback) => (
        <Image
          src={item?.avatar ?? item.fireBase_Image}
          alt={item.name ?? item.gmailName}
          width={40}
          height={40}
          className="avatar"
        />
      )
    },
    {
      title: "Name",
      data_key: "name"
    },
    {
      title: "Gmail Name",
      data_key: "gmailName"
    },
    {
      title: "Email",
      data_key: "email"
    },
    {
      data_key: "actions",
      title: "Actions",
      headerCellCssClass: "justify-content-center",
      cell: (item: ReviewFeedback) => {
        return (
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <EditIcon
              className="text-warning general-hover-cursor"
              onClick={() =>
                setModalData({
                  open: true,
                  data: item
                })
              }
            />

            <div
              onClick={() => {
                mutate({
                  collectionId: CollectionIDs.reviews,
                  dataId: item?.id,
                  data: {
                    ...item,
                    is_approved: !item?.is_approved,
                    is_archived: !item?.is_approved
                  }
                });
              }}
            >
              <ConditionalRenderer
                condition={item?.is_approved}
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
  const fieldList: formFieldsList[] = [
    {
      type: "textarea",
      name: "review",
      label: "Review",
      disabled: !edit,
      col: 12
    },

    {
      type: "text",
      name: "name",
      label: "Name",
      disabled: true,
      col: 4
    },
    {
      type: "text",
      name: "gmailName",
      label: "Gmail Name",
      disabled: true
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      disabled: true,
      col: 4
    },

    {
      type: "text",
      name: "designation",
      label: "Designation",
      disabled: true,
      col: 4
    },
    {
      type: "text",
      name: "organization",
      label: "Oesignation",
      disabled: true,
      col: 4
    },
    {
      type: "text",
      name: "xCollab",
      label: "Mode/Collaboration",
      disabled: true,
      col: 4
    },

    {
      type: "text",
      name: "city",
      label: "City",
      disabled: true,
      col: 4
    },
    {
      type: "text",
      name: "region",
      label: "Region",
      disabled: true,
      col: 4
    },
    {
      type: "text",
      name: "country",
      label: "Country",
      disabled: true,
      col: 4
    },

    {
      type: "text",
      name: "ip",
      label: "IP",
      disabled: true,
      col: 3
    },
    {
      type: "text",
      name: "latitude",
      label: "Latitude",
      disabled: true,
      col: 3
    },
    {
      type: "text",
      name: "longitude",
      label: "Longitude",
      disabled: true,
      col: 3
    },
    {
      type: "text",
      name: "hostname",
      label: "Hostname",
      disabled: true,
      col: 3
    },

    {
      type: "textarea",
      name: "policyAgreed",
      label: "Policy Agreed",
      disabled: true,
      col: 12
    }
  ];

  return (
    <>
      <div className="p-3">
        <ContentHeader
          breadCrumbs={{
            parent: {
              title: "Reviews & Feedbacks",
              link: ""
            },
            childList: []
          }}
          showButtonControl={false}
        />
        <DataList
          collectionId={CollectionIDs.reviews}
          tableDataKeyList={dataList}
          showActionsColumn={false}
        />
      </div>
      <ConditionalRenderer condition={confirmationModal}>
        <InfoModal
          modalData={confirmationModal!}
          close={() => setConfirmationModal(null)}
          type="info"
          message={`Are you sure want to delete`}
          onSuccess={() =>
            deleteDoc({
              collectionType: CollectionIDs.reviews,
              id: confirmationModal?.id!,
              directory: confirmationModal?.directory!
            })
          }
        />
      </ConditionalRenderer>
      <ConditionalRenderer condition={modalData?.data}>
        <Modal
          open={modalData?.open!}
          close={() => {
            setModalData(null);
            setEdit(false);
          }}
          title={"FeedBack & Review Modal"}
          variant="large"
          ContentClass="m-0 p-0"
          headerClass="p-3"
        >
          <div className="d-flex justify-content-between mt-2 px-3 align-items-center">
            <h3 className="d-flex gap-2 color-primary align-items-center m-0">
              <Image
                src={modalData?.data?.avatar ?? modalData?.data.fireBase_Image}
                alt={modalData?.data.name ?? modalData?.data.gmailName!}
                width={40}
                height={40}
                className="avatar"
              />
              <i>{modalData?.data?.name ?? modalData?.data?.gmailName}</i>
            </h3>
            <Button onClick={() => setEdit(!edit)}>
              <EditIcon className="text-white" />
            </Button>
          </div>
          <HookForms
            collectionId={CollectionIDs.reviews}
            defaultValues={modalData?.data!}
            fieldsList={fieldList}
            formType={"field-form"}
            formRowClassName="m-l-r-0"
            isInProcess={isProcessing || isUpdating}
            onSaveCallBack={(modifiedData) => {
              mutate({
                collectionId: CollectionIDs.reviews,
                dataId: modalData?.data?.id,
                data: {
                  ...parseObjectValues({
                    ...modalData?.data,
                    ...modifiedData,
                    review:
                      modifiedData?.review?.length < 1 ||
                      modifiedData?.review?.length === ""
                        ? modalData?.data?.review
                        : modifiedData?.review
                  })
                }
              });
            }}
            showSubmitFormButton
          />
        </Modal>
      </ConditionalRenderer>
      <ScreenLoader loading={isProcessing || isUpdating} />
    </>
  );
};

export default ReviewsFeedBacks;
