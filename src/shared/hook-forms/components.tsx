import React from "react";
import dynamic from "next/dynamic";
import Button from "../components/button";
import IconLabel from "../components/icon-label";
import ConditionalRenderer from "../components/conditional-renderer";
import { FormProps } from "../types/fields";

const FormRichTextEditor = dynamic(
  () =>
    import("../components/central-fields-control-unit/rich-text/form-editor"), {}
);
const FormFilePicker = dynamic(
  () => import("../components/central-fields-control-unit/form-file-picker")
);
const FormInput = dynamic(
  () => import("../components/central-fields-control-unit/input/form-input")
);
const FormSelect = dynamic(
  () => import("../components/central-fields-control-unit/select/form-select")
);

const SubmitFormButton = ({
  callBack,
  showSubmitFormButton,
}: {
  callBack: (...args: any) => void;
  showSubmitFormButton?: boolean;
}) => {
  return (
    <ConditionalRenderer condition={showSubmitFormButton}>
      <div className="position-sticky bottom-0 py-2 d-flex justify-content-end glassomorhpic-effect mx-2">
        <Button onClick={callBack}>
          <IconLabel title="Add"/>
        </Button>
      </div>
    </ConditionalRenderer>
  );
};

const Field = (props: FormProps) => {
  
  let Component = FormInput;

  if (props.options) {
    Component = FormSelect;
  } else if (props?.type === "rich-text") {
    Component = FormRichTextEditor;
  } else if (props.type === "file") {
    Component = FormFilePicker;
  }
  return (
    <Component
      {...props}
    />
  );
};
export { SubmitFormButton, Field };

