import { CSSProperties, ReactNode } from "react";

interface TableHeaderProps {
    headerList:TableDataKeyList[],
    headerCssClass?:string,
    headerStyle?:CSSProperties,
    isSticky?:boolean,
}

interface DataTableProps extends TableHeaderProps {
  data: GeneratorFunctionConstructor[] | any[];
  tableCssClass?: string;
  tableStyle?: CSSProperties;
  children?: ReactNode;
  hideSearch?: boolean;
  hideExport?: boolean;
  searchPlaceholder?: string;
  recordsPerPage?: number;
  isLoading?: boolean;
  showSerialNumbers?: boolean;
  isStrikeThroughEffect?: boolean;
}

export type {
    TableHeaderProps,
    DataTableProps
}