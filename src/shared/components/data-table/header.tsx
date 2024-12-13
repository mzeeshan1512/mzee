import React from "react";
import { TableHeaderProps } from "./type";
import ConditionalRenderer from "../conditional-renderer";

const TableHeader = ({
  headerList,
  headerCssClass = "",
  isSticky = true,
  showSerialNumbers=false,
  headerStyle: style,
  sortOrderList = {},
  onSortClick = (e: any) => {},
}: TableHeaderProps & {
  onSortClick?: (e: any) => void;
  sortOrderList?: GenericObject;
  showSerialNumbers?:boolean
}) => {
  const handleOnSortOrderChange = (data_key: string) => {
    let orderList = { ...sortOrderList };
    if (orderList[data_key] === "asc") {
      orderList[data_key] = "desc";
    } else {
      orderList[data_key] = "asc";
    }
    onSortClick(orderList);
  };
  return (
    <thead
      className={`${
        isSticky ? "position-sticky top-0 w-100 left-0 shadow " : ""
      } ${headerCssClass}`}
      style={{...style, zIndex:1}}
    >
      <tr>
        <ConditionalRenderer condition={showSerialNumbers}>
        <th
            className={`p-3`}
            style={style || { width: "3%" }}
          >
            <div className={`d-flex gap-2 align-items-center`}>
              S.No
            </div>
          </th>
        </ConditionalRenderer>
        {headerList?.map((item: TableDataKeyList, index: number) => (
          <th
            className={`${
              item?.headerCellCssClass ? item?.headerCellCssClass : ""
            } p-3`}
            style={style || { width: "10%" }}
            key={index}
          >
            <div className={`d-flex gap-2 align-items-center ${
              item?.headerCellCssClass ? item?.headerCellCssClass : ""
            }`}>
              {item?.title}
              <ConditionalRenderer condition={item?.isSortable}>
                <span
                  className={`chevron-icon  ${
                    sortOrderList![item?.data_key!] === "asc" ? "bottom" : ""
                  } general-hover-cursor `}
                  onClick={() => handleOnSortOrderChange(item?.data_key!)}
                />
              </ConditionalRenderer>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
