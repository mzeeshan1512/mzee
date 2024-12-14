"use client";
import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { adminRoutes, Mode } from "@/routes";
import { usePostData } from "@/shared/firebase-services/mutations";
import {
  useDeleteDocument,
  useGetDocuments,
} from "@/shared/firebase-services/useCollections";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import { BioSchema } from "@/shared/validation/about-schema";
import { getSafeArrayValue } from "@/shared/utils/common";
import FormSkeletonLoader from "@/shared/components/loaders-spinners/form-skeleton-loader";
import Button from "@/shared/components/button";
import { Trash } from "@/shared/icons/common";
import InfoModal from "@/shared/components/modal/info";
import { formFieldsList } from "@/shared/types/fields";

const ContentHeader = dynamic(
  () => import("@/shared/components/header/content-header"),
  {
    ssr: true,
  }
);
const FieldForm = dynamic(() => import("@/shared/hook-forms/field-form"), {
  ssr: true,
});

const Bio = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const [confirmationModal, setConfirmationModal] = useState<{
    open: boolean;
    id: string | null;
  } | null>(null);
  const { isLoading, data, isRefetching } = useGetDocuments(CollectionIDs.myInfo);
  const { isLoading: isProcessing, mutate } = usePostData(CollectionIDs.myInfo);
  const { isLoading: deletingInfo, mutate: deleteInfo } = useDeleteDocument(
    CollectionIDs.myInfo,
    () => setConfirmationModal(null)
  );
  const [options, setOptions] = useState<selectObject[]>([]);
  const editMode = useMemo(() => {
    return searchParams?.get("mode") === Mode.edit || false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("mode")]);

  const BioFormFields: formFieldsList[] = [
    {
      type: "text",
      name: "user_name",
      label: "User Name",
      inputCssClass: "clr",
      required: true,
      disabled: !editMode,
      col: 6,
    },
    {
      type: "text",
      name: "location",
      label: "Based In",
      inputCssClass: "clr",
      required: true,
      disabled: !editMode,
      col: 6,
    },
    {
      type: "rich-text",
      name: "bio",
      label: "Bio",
      placeholder: "Details",
      enablePreview: true,
      required: true,
      disabled: !editMode,
      col: 12,
    },
    {
      name: "user_avatar",
      type:"file",
      label: "Profile Image",
      required: true,
      disabled: !editMode,
      col: 6,
    },
    {
      name: "skills_loop",
      label: "Skills",
      isClearable: true,
      isMulti: true,
      isCreatable: true,
      options: options,
      callBack: (...args: any) => {
        setOptions(args);
      },
      disabled: !editMode,
      col: 6,
    },
  ];

  const myInfo: any = useMemo(() => {
    if (data) {
      const value = getSafeArrayValue(data, 0);
      if (value) {
        return {
          ...value,
          bio: decodeURIComponent(escape(atob(value?.bio))) || null
        };
      }
    }
    return null;
  }, [data]);

  return (
    <>
      <ContentHeader
        breadCrumbs={{
          parent: {
            title: "About",
            link: ""
          },
          childList: [
            {
              title: "Bio",
              link: "/admin/about"
            },
            {
              title: editMode ? Mode?.edit : "View",
              link: ""
            }
          ]
        }}
        buttonControl={{
          formId: editMode ? "bio-form" : null,
          disabled: isProcessing,
          content: editMode ? "Save" : "Edit",
          icon: editMode ? "" : "add",
          onClick: () => {
            if (!editMode) {
              navigate.push(`${adminRoutes.about}?mode=${Mode.edit}`);
            }
          }
        }}
        CallBackButtonComponent={
          <Button
            variant="danger"
            onClick={() =>
              setConfirmationModal({
                id: myInfo?.id,
                open: true
              })
            }
            disabled={!myInfo}
          >
            <Trash />
          </Button>
        }
      />
      <ConditionalRenderer
        condition={!isLoading || !isRefetching}
        component={<FormSkeletonLoader formFieldsList={BioFormFields} />}
      >
        <FieldForm
          fieldsList={BioFormFields}
          formId="bio-form"
          collectionId={CollectionIDs.myInfo}
          validationSchema={BioSchema}
          isInProcess={isProcessing || deletingInfo}
          defaultValues={myInfo}
          onSaveCallBack={(payload: any) => {
            mutate({
              data: {
                ...payload,
                bio: btoa(unescape(encodeURIComponent(payload?.bio)))
              },
              collectionId: CollectionIDs.myInfo,
              dataId: myInfo?.id
            });
          }}
        />
      </ConditionalRenderer>
      <ConditionalRenderer condition={myInfo}>
        <InfoModal
          close={() => setConfirmationModal(null)}
          message="Are you sure want to Delete your bio?"
          modalData={confirmationModal!}
          onSuccess={() =>
            deleteInfo({
              collectionType: CollectionIDs.myInfo,
              id: confirmationModal?.id!
            })
          }
        />
      </ConditionalRenderer>
    </>
  );
};

export default Bio;
