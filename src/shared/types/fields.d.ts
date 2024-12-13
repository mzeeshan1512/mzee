import { ComponentProps } from "react";

type FunctionsProps = {
  onChange?: (...args: any) => void;
  onClick?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  callBack?: (...args: any) => void;
  setValue?: (...args: any) => void;
  clearErrors?: (...args: any) => void;
  getValues?: (...args: any) => void;
};

type DateFormat =
  | "YYYY"
  | "MM-YYYY"
  | "MMM-YYYY"
  | "YYYY-MM"
  | "YYYY-MMM"
  | "YYYY-MM-DD"
  | "YYYY-MMM-DD"
  | "DD/MM/YYYY"
  | "DD/MMM/YYYY"
  | "MM-DD-YYYY"
  | "MMM-DD-YYYY"
  | "YYYY/MM"
  | "YYYY/MMM"
  | "MM/YYYY"
  | "MMM/YYYY";

type inputType =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "numeric"
  | "tel"
  | "range"
  | "color"
  | "radio"
  | "switch"
  | "password"
  | "checkbox"
  | "file"
  | "drop-zone-file"
  | "rich-text"
  | "date-time";

interface CommonFieldProps extends FunctionsProps {
  required?: boolean;
  disabled?: boolean;
  inValid?: boolean;
  isValid?: boolean;
  autoFocus?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  type?: inputType;
  defaultValue?: any;
  value?: any;
  dateFormat?:DateFormat | []
}

type InputProps = ComponentProps<"input"> &
  CommonFieldProps & {
    inputStyles?: CSSProperties;
    inputTag?: "input" | "textarea";
    inputCssClass?: string;
  };

type LabelProps = ComponentProps<"label"> & {
  label?: string;
  labelCssClass?: string;
  labelStyle?: CSSProperties;
  showTick?: boolean;
  CallBackComponent?: any;
  radioCheckLabelPlacement?: "left" | "right";
};

type ImageProps = ComponentProps<"img">;

type ErrorProps = {
  errorCssClass?: string;
  errorStyles?: CSSProperties;
  errorTag?: "div" | "span" | "p";
  // errorPlacement?: "top" | "bottom";
  message?: string;
};

type errorObj = {
  error?: any;
  isArray?: boolean;
};

// select
interface selectComponentTypes {
  ClearIndicator?: any;
  Control?: any;
  DropdownIndicator?: any;
  DownChevron?: any;
  CrossIcon?: any;
  Group?: any;
  GroupHeading?: any;
  IndicatorsContainer?: any;
  IndicatorSeparator?: any;
  Input?: any;
  LoadingIndicator?: any;
  Menu?: any;
  MenuList?: any;
  MenuPortal?: any;
  LoadingMessage?: any;
  NoOptionsMessage?: any;
  MultiValue?: any;
  MultiValueContainer?: any;
  MultiValueLabel?: any;
  MultiValueRemove?: any;
  Option?: any;
  Placeholder?: any;
  SelectContainer?: any;
  SingleValue?: any;
  ValueContainer?: any;
}

type SelectProps = CommonFieldProps & {
  isMulti?: boolean;
  isClearable?: boolean;
  isCreatable?: boolean;
  isSearchable?: boolean;
  options?: [] | any;
  menuPlacement?: "top" | "bottom";
  selectStyles?: any;
  selectCssClass?: string;
  customComponent?: selectComponentTypes;
};

type RichTextFormatType =
  | "header"
  | "font"
  | "size"
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "blockquote"
  | "list"
  | "bullet"
  | "indent"
  | "link"
  | "image"
  | "video"
  | "color"
  | "background"
  | "align"
  | "code-block";

interface RichTextProps extends CommonFieldProps, FunctionsProps {
  format?: RichTextFormatType[];
  modules?: any;
  enablePreview?: boolean;
  modalPreview?: boolean;
  parsedHtml?:boolean
}

type filePickerProps = {
  isSvg?: boolean;
  setSvgCode?: string;
  svgCode?: string;
};

type formFieldsList = {
  col?: string | number;
  fieldName?: string;
  index?: number;
  CallBackComponent?: any;
  watchedKey?: string;
  impactedKey?: {
    key: string;
    value?: any;
    fieldKey?: string;
    isDisabled?: boolean;
    mode?: "append" | "changed";
    nestedFieldKey?: string;
    replaceSpecialCharacter?: {
      char: string | RegExp;
      replacedChar: string;
    };
  };
  colClassName?: string;
} & CommonFieldProps &
  SelectProps &
  RichTextProps &
  InputProps &
  filePickerProps &
  LabelProps;

type formListObject = { [key: string]: formFieldsList[] };

interface HookFormProps {
  fieldsList: formListObject | formFieldsList[];
  collectionId: string;
  formId?: string;
  formTitle?: string;
  formClassName?: string;
  formRowClassName?: string;
  fieldArrayName?: string | null | any;
  defaultValues?: any;
  isDynamicForm?: boolean;
  isInProcess?: boolean;
  onlyFormData?: boolean;
  showSubmitFormButton?: boolean;
  dataId?: string;
  GroupedClass?: string;
  mode?: "create" | "edit" | string;
  formType?:
    | "field-form"
    | "field-array-form"
    | "tabular-form"
    | "file-uploader-form";
  onSaveCallBack?: (e?: any) => void;
}

type CommonInputProps = {
  floatingLabels?: boolean;
  formGroup?: boolean;
  formGroupClass?: string;
  control?: any;
} & Functions &
  CommonFieldProps;

type FormProps = { progress?: number } & CommonInputProps &
  LabelProps &
  InputProps &
  ErrorProps &
  errorObj &
  SelectProps &
  filePickerProps;
