import React from "react";
import DefaultBg from "@/assets/bgs/home-dark.png";
import "./styles.css";

type FallBackErrorLayoutProps = {
  children: React.ReactNode;
  code?: "400" | "404" | "500" | "OOPS";
  message?: string;
  customContent?: boolean;
};
const RenderErrorComponent = ({
  children,
  code = "404",
  message
}: FallBackErrorLayoutProps) => {
  const errorcode = React.useMemo(() => {
    let part3 = code?.[2] || null;
    const part1 = code?.[0] || null,
      part2 = code?.[1] || null;
    if (code === "OOPS") {
      part3 = code[2] + code[3];
    }
    return [part1, part2, part3];
  }, [code]);

  return (
    <div className="flex flex-col gap-6">
      {/* code */}
      <div className="error-animated-text">
        <span>{errorcode[0]}</span>
        <span>
          <span className="screen-reader-text"></span>
        </span>
        <span>{errorcode[2]}</span>
      </div>
      {/* message */}
      {message && (
        <small className="text-center">
          {message ?? "Something went wrong"}
        </small>
      )}
      {children}
    </div>
  );
};

const FallBackLayout = (props: FallBackErrorLayoutProps) => {
  return (
    <div
      className="error-container relative"
      style={{
        backgroundImage: `url(${DefaultBg?.src})`
      }}
    >
      {props.customContent ? (
        props.children
      ) : (
        <RenderErrorComponent {...props} />
      )}
    </div>
  );
};

export default FallBackLayout;

export { RenderErrorComponent };

export type { FallBackErrorLayoutProps };
