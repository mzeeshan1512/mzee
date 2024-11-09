type toolTipPosition = "left" | "right" | "top" | "bottom" | null;

type scrollSpyLinkProps = {
  link?: string;
  title: string;
  className?: string;
  icon?: any;
  disable?: boolean;
  isStaticLink?: boolean;
  onCallBack?: (e?: any) => void;
};

type BreadCrumbsProps = scrollSpyLinkProps;

type buttonVariant = | "primary"
| "secondary"
| "success"
| "danger"
| "warning"
| "info"
| "light"
| "dark";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?:buttonVariant,   
  onClick?: (e: any) => void;
  onSubmit?: (e: any) => void;
  outline?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text?: string | number | undefined | null;
  formId?: string | number | null | undefined | any;
  color?: string;
  className?: string;
  Loader?: any;
  style?: any;
}

type GenericObject = { [key: string]: any };

interface TableDataKeyList {
  data_key: string;
  isSortable?: boolean;
  title: string;
  headerCellCssClass?: string;
  style?: CSSProperties;
  cell?: any;
}

type ContentHeader = {
  breadCrumbs: {
    parent?: BreadCrumbsProps;
    childList: BreadCrumbsProps[] | [];
  };
  buttonControl?: ButtonProps &{
    content?: any;
    icon?: "add" | "" | "remove";
    hideIcon?:boolean,
  };
  showButtonControl?: boolean;
  contentClassName?:string;
  CallBackComponent?:any;
  CallBackButtonComponent?:any
}

type ModalVariant = "large" | "medium" | "small";

interface ContentControllerProps {
  tableDataKeyList: TableDataKeyList[];
  collectionId: string;
  directoryParentKey?: string;
  showActionsColumn?: boolean;
  showDeleteButton?: boolean;
  showEyeIcon?: boolean;
  showEditButton?: boolean;
  showSmartApprove?: boolean;
  hideSearch?:boolean
  hideExport?:boolean
  isLoading?:boolean
}