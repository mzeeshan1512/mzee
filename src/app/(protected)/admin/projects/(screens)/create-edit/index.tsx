import React, { useMemo } from "react";
import Tabs from "@/shared/components/tabs";
import { adminRoutes } from "@/routes";
import { formFieldsList, formListObject } from "@/shared/types/fields";
import { CollectionIDs } from "@/shared/constants/collection-ids";
import {
  useGetDocument,
  useGetDocuments,
} from "@/shared/firebase-services/useCollections";
import {
  MultiValueWithIcon,
  OptionWithIcon
} from "@/shared/components/central-fields-control-unit/select/components";
import TabContentLoader from "@/shared/components/loaders-spinners/tab-content-loader";
import {
  basicPrefilledFields,
  basicOptionalFields,
  imageGalleryFields,
  videoGalleryFields,
  detailedContentFields,
  optionsProjectCategoryList
} from "./list";
import ContentForm from "./form-content";
import {
  basicInfoSchema,
  imageGallerySchema,
  videoGallerySchema
} from "./validations";
import { tabIds } from "..";
import { getValidObjectKeysLength } from "@/shared/utils/data-comparison";
import { CircularProgressBar } from "@/shared/components/progress-bar";

type Props = {
  mode: string;
  docId?: string;
  tabId?: string;
  navigate: any;
  techOptions?: any;
  projectInfo?: any;
  projectProgress?: number;
};

const Content = ({
  mode,
  docId,
  tabId,
  navigate,
  techOptions,
  projectInfo,
  projectProgress
}: Props) => {
  const basicRequiredFields: formFieldsList[] = useMemo(
    () => [
      {
        type: "text",
        name: "title",
        label: "Title",
        required: true,
        impactedKey: {
          key: "unique_identifier",
          fieldKey: "title",
          replaceSpecialCharacter: {
            char: /[^a-zA-Z0-9]+/g,
            replacedChar: "-"
          }
        }
      },
      {
        type: "text",
        name: "tech_stack",
        label: "Technology Stack",
        required: true,
        isMulti: true,
        options: techOptions,
        defaultValue: null,
        value: null,
        isClearable: true,
        customComponent: {
          Option: OptionWithIcon,
          MultiValue: MultiValueWithIcon
        }
        // impactedKey: {
        //   key: "unique_identifier",
        //   fieldKey: "tech_stack",
        //   mode: "append",
        //   nestedFieldKey: "label"
        // }
      },
      {
        name: "project_category",
        label: "Project Category",
        required: true,
        options: optionsProjectCategoryList,
        defaultValue: optionsProjectCategoryList[0],
        value: optionsProjectCategoryList[0],
        isClearable: true,
        // impactedKey: {
        //   key: "is_featured",
        //   currentFieldValue: "project_category",
        //   mode: "equateWithFieldValue",
        //   nestedFieldKey: "value",
        //   value: optionsProjectCategoryList?.[0]?.value
        // }
      } as any,
      {
        type: "text",
        name: "unique_identifier",
        label: "Unique Identifier",
        value: new Date()
          .toLocaleDateString()
          ?.replaceAll(",", "")
          .replaceAll(" ", "-"),
        required: true,
        disabled: true,
        colClassName: "d-none"
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        required: true,
        col: 12
      }
    ],
    [techOptions]
  );

  const basicInfoFieldList: formListObject = {
    "Required Fields": basicRequiredFields,
    "Prefilled Field/Good to have": basicPrefilledFields,
    "Optional Field": basicOptionalFields
  };

  const tabData: { fields: any; schema: any } = useMemo(() => {
    let fields: any = [];
    let schema: any = null;
    switch (tabId) {
      case tabIds.basicInfo:
        fields = basicInfoFieldList;
        schema = basicInfoSchema;
        break;
      case tabIds.imageGallery:
        fields = imageGalleryFields;
        schema = imageGallerySchema;
        break;
      case tabIds.videoGallery:
        fields = videoGalleryFields;
        schema = videoGallerySchema;
        break;
      case tabIds.detailedContent:
        fields = detailedContentFields;
        schema = null;
        break;
      default:
        break;
    }

    return { fields, schema };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabId]);

  const tabList = [
    {
      title: "Basic Info",
      id: tabIds.basicInfo,
      asterisk: true
    },
    {
      title: "Images Gallery",
      id: tabIds.imageGallery,
      disabled: !docId,
      asterisk: true
    },
    {
      title: "Video Gallery",
      id: tabIds.videoGallery,
      disabled: !docId
    },
    {
      title: "Details/Content",
      id: tabIds.detailedContent,
      disabled: !docId
    }
  ];

  const getUrl = (tabId: any) => {
    let queryString = `${adminRoutes.projects}?mode=${mode}&tabId=${tabId}`;
    if (docId) {
      queryString = queryString + `&documentId=${docId}`;
    }
    return queryString;
  };

  const TabInfo = useMemo(() => {
    let result: any = {};
    const tabs: any = Object?.values(tabIds);
    let currentTabIndex = tabs?.indexOf(tabId) + 1;
    if (currentTabIndex > 0 && currentTabIndex <= tabs?.length - 1) {
      result.id = tabs[currentTabIndex];
    } else {
      result.id = tabs[0];
    }
    let progress = 0;
    let keyCount = tabData?.fields?.length;
    if (projectInfo && projectInfo?.hasOwnProperty(tabId)) {
      const { progressCount, keysCount } = getValidObjectKeysLength(
        projectInfo[tabId!]
      );
      progress = progressCount;
      if (!keyCount) {
        keyCount = keysCount;
      }
    }
    const percentageProgress = (progress / keyCount) * 100;
    result.progress = Math.min(Math.max(percentageProgress, 0), 100)?.toFixed(
      2
    );
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabId]);

  if (docId && !tabId) {
    navigate.push(
      `${adminRoutes.projects}?mode=${mode}&tabId=${tabList[0].id}&documentId=${docId}`
    );
  }

  return (
    <Tabs
      tabsList={tabList}
      contentClass=""
      onSetCallBackActive={(tab: any) => {
        navigate.push(getUrl(tab?.id));
      }}
      headerCallBackComponent={
        <CircularProgressBar
          width={50}
          height={50}
          borderWidth={5}
          progress={+projectProgress?.toFixed(1)!}
        />
      }
    >
      <ContentForm
        mode={mode}
        collectionId={CollectionIDs.projects}
        fieldsList={tabData?.fields}
        validationSchema={tabData?.schema}
        formRowClassName="mb-1"
        nextTab={docId ? getUrl(TabInfo.id) : `${adminRoutes.projects}`}
        progress={TabInfo.progress}
        defaultValues={projectInfo}
      />
    </Tabs>
  );
};

const CreateEdit = (props: Props) => {
  const { isLoading, data: tech } = useGetDocuments(CollectionIDs.technologies);
  const techOptions = useMemo(() => {
    const options: any = [];
    tech?.forEach((item: Services_TechsTools) => {
      if (!item.is_archived) {
        options.push({
          value: { ...item?.blob?.value },
          label: item.title || item.blob?.label,
          tech_id: item.id
        });
      }
    });
    return options;
  }, [tech]);

  const { isLoading: projectLoading, data: projectInfo } = useGetDocument(
    CollectionIDs.projects,
    props?.docId
  );
  // progress info
  const projectProgress = useMemo(() => {
    let progress = 0;
    let totalKeys = Object.keys(tabIds).length;
    if (projectInfo) {
      Object.keys(projectInfo)?.forEach((key: any) => {
        if (tabIds?.hasOwnProperty(key)) {
          totalKeys -= 1;
        }
        let { progressCount, keysCount } = getValidObjectKeysLength(
          projectInfo[key]
        );
        progress += progressCount;
        totalKeys += keysCount;
      });
    }
    const percentageProgress = (progress / totalKeys) * 100;
    return Math.min(Math.max(percentageProgress, 0), 100)?.toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo]);

  if (projectLoading || isLoading) {
    return <TabContentLoader />;
  }

  return (
    <Content
      {...props}
      projectInfo={projectInfo}
      projectProgress={+projectProgress}
      techOptions={techOptions}
    />
  );
};

export default CreateEdit;
