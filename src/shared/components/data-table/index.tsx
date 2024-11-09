"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { exportToJson, searchArray } from "@/shared/utils/array-data";
import { LayoutThemeContext } from "@/shared/context";
import ConditionalRenderer from "../conditional-renderer";
import Spinner from "../loaders-spinners/spinner";
import Pagination from "../pagination";
import { DataTableProps } from "./type";
import TableHeader from "./header";
import Search from "../search";
import Button from "../button";

const DataTable = (props: DataTableProps) => {
  const { showSerialNumbers = true } = props;
  const { themeState } = useContext(LayoutThemeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrderList, setSortOrderList] = useState<GenericObject>({});
  const [search, setSearch] = useState<string | null>(null);

  const recordsPerPage = props?.recordsPerPage || 10;

  useEffect(() => {
    if (props?.headerList?.length > 0) {
      let orderList: any = {};
      props?.headerList?.forEach((item) => {
        if (item?.data_key && item?.isSortable) {
          orderList[item?.data_key] = "asc";
        }
      });
      setSortOrderList(orderList);
    }
  }, [props?.headerList]);

  const sortData = useMemo(() => {
    if (!props?.data) return [];
    let data = [...props?.data];
    Object?.keys(sortOrderList)?.forEach((key) => {
      data?.sort((a, b) => {
        let aData = JSON.stringify(a[key]);
        let bData = JSON.stringify(b[key]);
        if (sortOrderList[key] === "asc") {
          return aData > bData ? 1 : -1;
        } else {
          return aData < bData ? 1 : -1;
        }
      });
    });
    return data;
  }, [sortOrderList, props.data]);

  const dataList = useMemo(() => {
    if (search && search?.length > 2 && search !== "") {
      return searchArray([...sortData], search);
    }
    return sortData;
  }, [sortData, search]);

  return (
    <div className="d-flex flex-column gap-3">
      <ConditionalRenderer
        condition={
          props?.hideSearch !== undefined || props?.hideExport !== undefined
            ? !props?.hideSearch || props?.hideExport
            : true
        }
      >
        <div className="d-flex w-full justify-content-end mt-3 gap-2">
          <ConditionalRenderer condition={!props?.hideSearch}>
            <Search
              searchValue={search!}
              onSearch={(e) => setSearch(e?.target?.value)}
              searchPlaceholder="Type atleast 3 characters"
              disabled={props?.data?.length < 1 || props?.isLoading}
            />
          </ConditionalRenderer>
          <ConditionalRenderer condition={!props?.hideExport}>
            <Button
              onClick={() => {
                exportToJson(props.data);
              }}
              disabled={props.isLoading || props.data?.length <= 0}
            >
              Export To JSON
            </Button>
          </ConditionalRenderer>
        </div>
      </ConditionalRenderer>
      <div className="max-table-h-scroll position-relative">
        <table
          className={`${
            props?.tableCssClass || ""
          } table align-middle table-striped${
            themeState?.mode === "dark" ? " table-dark" : ""
          }${props?.data?.length < 1 ? " mb-0" : ""}`}
          style={props.tableStyle}
        >
          <TableHeader
            {...props}
            showSerialNumbers={showSerialNumbers}
            onSortClick={setSortOrderList}
            sortOrderList={sortOrderList}
          />
          <tbody>
            <ConditionalRenderer
              condition={!props?.isLoading && dataList?.length! > 0}
              component={
                <tr className="align-middle text-center cursor-pointer py-2 my-2 mt-4 pt-4">
                  <td
                    colSpan={
                      props.headerList?.length + (showSerialNumbers ? 1 : 0)
                    }
                  >
                    <ConditionalRenderer
                      condition={props?.isLoading}
                      component={"No Data Found"}
                    >
                      <Spinner type="ben-loader" />
                    </ConditionalRenderer>
                  </td>
                </tr>
              }
            >
              <ConditionalRenderer
                condition={!props.children}
                component={props?.children}
              >
                {dataList
                  ?.slice(
                    (currentPage - 1) * recordsPerPage,
                    (currentPage - 1) * recordsPerPage + recordsPerPage
                  )
                  ?.map((item, index) => (
                    <tr key={index}>
                      <ConditionalRenderer condition={showSerialNumbers}>
                        <td className="px-3">
                          {(currentPage - 1) * recordsPerPage + index + 1}
                        </td>
                      </ConditionalRenderer>
                      {props?.headerList?.map((headerItem, headerIndex) => (
                        <td key={headerIndex} className="px-3">
                          {headerItem?.cell
                            ? headerItem?.cell(item)
                            : item[headerItem?.data_key!]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </ConditionalRenderer>
            </ConditionalRenderer>
          </tbody>
        </table>
        <ConditionalRenderer condition={props?.data?.length > recordsPerPage}>
          <div className="position-sticky bottom-0 glassomorhpic-effect p-2">
            <Pagination
              list={dataList}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              recordsPerPage={recordsPerPage}
              totalRecord={dataList?.length}
            />
          </div>
        </ConditionalRenderer>
      </div>
    </div>
  );
};

export default DataTable;
