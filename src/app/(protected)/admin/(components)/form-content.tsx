import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Mode } from "@/routes";
import HookForms, {HookFormProps} from "@/shared/hook-forms";
import { useGetDocument } from "@/shared/firebase-services/useCollections";
import FormSkeletonLoader from "@/shared/components/loaders-spinners/form-skeleton-loader";
import ConditionalRenderer from "@/shared/components/conditional-renderer";

const FormContent = (
  props: AdminContentProps &
    HookFormProps & {
      mode?: string;
      docId?: string;
    }
) => {
  const { collectionId, docId, fieldsList, mode } = props;
  const navigate = useRouter();
  const pathName = usePathname();
  const {
    isLoading: fetchingDocument,
    data: document,
    isFetching,
    error,
  } = useGetDocument(collectionId, docId!) as any;

  if (error) {
    navigate?.replace(pathName);
  }

  return (
    <>
      <ConditionalRenderer
        condition={!(fetchingDocument || isFetching)}
        component={<FormSkeletonLoader formFieldsList={fieldsList} />}
      >
        <HookForms
          {...props}
          formId={mode}
          validationSchema={
            mode !== Mode.edit &&
            (props?.fieldArrayName || props?.formType === "tabular-form")
              ? props?.formValidationSchema?.array
              : props?.formValidationSchema?.field
          }
          formType={mode === Mode.edit ? "field-form" : props?.formType}
          fieldArrayName={mode === Mode.edit ? null : props?.fieldArrayName}
          defaultValues={document}
          dataId={docId}
        />
      </ConditionalRenderer>
    </>
  );
};

export default FormContent;
