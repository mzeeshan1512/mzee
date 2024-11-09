import React, { useMemo } from "react";
import { DefaultBg } from "@/shared/config";
import ConditionalRenderer from "../components/conditional-renderer";

const FallBackLayout = ({
  children,
  code = "404",
  message,
  customContent = false,
}: {
  children: React.ReactNode;
  code?: "400" | "404" | "500" | "OOPS";
  message?: string;
  customContent?: boolean;
}) => {
  const errorcode = useMemo(() => {
    let part1,
      part2,
      part3 = null;
    part1 = code[0];
    part2 = code[1];
    part3 = code[2];
    if (code === "OOPS") {
      part3 = code[2] + code[3];
    }
    return [part1, part2, part3];
  }, [code]);

  const ErrorCode = () => {
    return (
      <div className="container content-container">
        <div>
          {/* code */}
          <div className="error-animated-text">
            <span>{errorcode[0]}</span>
            <span>
              <span className="screen-reader-text"></span>
            </span>
            <span>{errorcode[2]}</span>
          </div>
          {/* message */}
          <ConditionalRenderer condition={message}>
            <div className="error-text">
              <div className="typewriter">
                <h3
                  className={`text ${
                    message!?.length > 50 ? "no-animation" : ""
                  }`}
                >
                  {message}
                </h3>
              </div>
            </div>
          </ConditionalRenderer>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div
      className="error-container"
      style={{
        backgroundImage: `url(${DefaultBg?.src})`,
      }}
    >
      <ConditionalRenderer condition={customContent} component={<ErrorCode />}>
        {children}
      </ConditionalRenderer>
    </div>
  );
};

export default FallBackLayout;
