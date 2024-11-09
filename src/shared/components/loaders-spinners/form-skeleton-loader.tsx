import React from "react";
import { formFieldsList, formListObject } from "@/shared/types/fields";
import TextWithLine from "../text-with-line";
import { Col, Row } from "../row-cols";
import SkeletonLoader from "./skeleton";

const FormSkeletonLoader = ({
  formFieldsList,
}: {
  formFieldsList: formListObject | formFieldsList[];
}) => {
  const renderList = (list: formFieldsList[]) => (
    <Row className="">
      {list?.map((item, index) => (
        <Col
          lg={item?.col || ""}
          key={`${item.name}-${index}-${new Date()?.getMilliseconds()}`}
          className="my-1 d-flex flex-column gap-2"
        >
          <SkeletonLoader height={20} />
          <SkeletonLoader height={40}  />
        </Col>
      ))}
    </Row>
  );
  return Array.isArray(formFieldsList)
    ? renderList(formFieldsList)
    : Object?.keys(formFieldsList)?.map((item: string, index) => {
        return (
          <React.Fragment key={item + index}>
            <TextWithLine text={item} />
            {renderList(formFieldsList[item])}
          </React.Fragment>
        );
      });
};

export default React.memo(FormSkeletonLoader);
