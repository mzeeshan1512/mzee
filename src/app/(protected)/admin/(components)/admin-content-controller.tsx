"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Mode } from "@/routes";
import { HookFormProps } from "@/shared/types/fields";
import ConditionalRenderer from "@/shared/components/conditional-renderer";
import AdminContent from "@/shared/components/header/content-header";
import ScreenLoader from "@/shared/components/loaders-spinners/screen-loader";
const DataList = dynamic(
  () => import("@/shared/components/data-table/data-list"),
  {
    ssr: true,
  }
);

const Form = dynamic(() => import("./form-content"), {
  ssr: true,
  loading: () => <ScreenLoader loading />,
});

const AdminContentController = (
  props: AdminContentProps & ContentHeader & HookFormProps
) => {
  const { breadCrumbs, showButtonControl = true } = props;
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const docId = searchParams?.get("documentId");
  const mode = useMemo(() => {
    return searchParams?.get("mode") || Mode.list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.get("mode")]);

  return (
    <>
      <AdminContent
        breadCrumbs={{
          parent: breadCrumbs.parent,
          childList: [
            ...breadCrumbs.childList,
            {
              title: mode,
              link: "",
            },
          ],
        }}
        buttonControl={{
          formId: mode !== Mode.list ? mode : null,
          content: mode === Mode.list ? "Add" : "Save",
          onClick:
            mode === Mode.list
              ? () => {
                  return navigate.push(`${pathName}?mode=${Mode.create}`);
                }
              : () => {},
          icon: mode === Mode.list ? "add" : "",
          ...props?.buttonControl,
        }}
        showButtonControl={showButtonControl}
      />
      <div className="my-1">
        <ConditionalRenderer
          condition={mode !== Mode.list}
          component={<DataList {...props} />}
        >
          <Form {...props} docId={docId!} mode={mode} />
        </ConditionalRenderer>
      </div>
    </>
  );
};

export default AdminContentController;
