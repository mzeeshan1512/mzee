import React from "react";
import { DefaultBg } from "@/shared/app-config";
import ShowIf from "@/shared/components/show-if";
import "./styles.css";
import { useInterval } from "@/shared/hooks/use-interval";

type messageProps = {
  message?: string;
  subTextMessage?: string;
};

type FallBackErrorLayoutProps = {
  children: React.ReactNode;
  code?: "400" | "404" | "500" | "OOPS";
  customContent?: boolean;
} & messageProps;

const RenderErrorMessage = ({ message, subTextMessage }: messageProps) => {
  const [streamedText, setStreamedText] = React.useState<string>("");

  const typeCharacter = () => {
    if (streamedText?.length !== message?.length) {
      const sliceIndex: number = streamedText?.length;
      if (sliceIndex <= message!.length) {
        setStreamedText((prev) => prev + message![sliceIndex]);
      }
    } else {
      stop();
    }
  };

  const { stop } = useInterval(typeCharacter, 50, { autoInvoke: true });

  return (
    <>
      <div className="container text-center py-2 px-5 text-base flex items-center gap-1 justify-center">
        <p>{streamedText}</p>
        <span className="blinking-caret" />
      </div>
      {streamedText?.length >= message?.length! && subTextMessage && (
        <strong className="text-center">
          <i>{subTextMessage}</i>
        </strong>
      )}
    </>
  );
};

const RenderErrorComponent = ({
  children,
  code = "404",
  message,
  subTextMessage
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
      <ShowIf conditionalRenderKey={message}>
        <RenderErrorMessage
          message={message!}
          subTextMessage={subTextMessage}
        />
      </ShowIf>
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
      <ShowIf
        conditionalRenderKey={props.customContent}
        elseComponent={<RenderErrorComponent {...props} />}
      >
        {props.children}
      </ShowIf>
    </div>
  );
};

export default FallBackLayout;

export { RenderErrorComponent, RenderErrorMessage };

export type { FallBackErrorLayoutProps };
