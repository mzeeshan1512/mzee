import { Metadata } from "next";
import { appName } from "./config";

const getMetaData = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}): Metadata => {
  return {
    title: title + " | " + appName,
    description: description,
  };
};

export default getMetaData;
