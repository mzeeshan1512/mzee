import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentHeader from "@/shared/components/header/content-header";
import { adminRoutes } from "@/routes";
import HookForms, { HookFormProps } from "@/shared/hook-forms";
import { usePostData } from "@/shared/firebase-services/mutations";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import ProgressBar from "@/shared/components/progress-bar";
import { deepDataComparison } from "@/shared/utils/data-comparison";

const ContentForm = (
  props: HookFormProps & {
    nextTab: string;
    progress: number;
    validationSchema?: any;
  }
) => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const tabId = searchParams?.get("tabId");
  const docId = searchParams?.get("documentId");
  const mode = searchParams?.get("mode");
  const handleCallBack = (e?: any) => {
    navigate.push(props.nextTab!);
  };

  const { isLoading, mutate } = usePostData(CollectionIDs.projects, (e: any) =>
    handleCallBack(e)
  );

  const defaultValues = useMemo(() => {
    if (!tabId) return {};
    if (props?.defaultValues?.hasOwnProperty(tabId)) {
      return props.defaultValues[tabId];
    }
    return {};
  }, [tabId, props?.defaultValues]);

  const childList = useMemo(() => {
    const tab = tabId;
    let list = [];
    if (tab) {
      list.push({
        title: tab,
        link: "",
      });
    }
    list.push({
      title: docId ? "Edit" : mode!,
      link: "",
    });
    return list;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabId]);

  const formId = useMemo(
    () => `${tabId}-${props?.mode}-form-id`,
    [props.mode, tabId]
  );

  return (
    <>
      <ContentHeader
        breadCrumbs={{
          parent: {
            title: "Project",
            link: adminRoutes.projects,
          },
          childList: childList,
        }}
        buttonControl={{
          content: "Save",
          formId: formId,
        }}
        CallBackComponent={
          <div className="max-w-cal">
            <ProgressBar progress={props.progress} />
          </div>
        }
        contentClassName="px-3 py-2 border-bottom border-secondary"
      />
      <div className="position-relative">
        <HookForms
          {...props}
          onlyFormData
          formId={formId}
          formRowClassName={
            (props?.formRowClassName ? props?.formRowClassName : "") + " mx-0"
          }
          isInProcess={isLoading}
          GroupedClass={
            (props?.GroupedClass ? props?.GroupedClass : "") + " px-2"
          }
          defaultValues={defaultValues}
          formClassName="max-tab-h-scroll p-2"
          onSaveCallBack={(payload) => {
            if (!deepDataComparison(defaultValues, payload)) {
              mutate({
                collectionId: CollectionIDs.projects,
                dataId: docId,
                data: {
                  ...props?.defaultValues,
                  [tabId!]: payload
                }
              });
            } else handleCallBack();
          }}
        />
      </div>
    </>
  );
};

export default ContentForm;
