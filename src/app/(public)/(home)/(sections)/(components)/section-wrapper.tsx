import React from "react";
import ShowIf from "@/shared/components/show-if";
import { Spotlight } from "@/shared/components/spot-light";

export type SectionContainerProps = {
  id: string;
  title: string;
  quotation?: string;
  children: React.ReactNode;
  containerProps?: React.ComponentProps<"div">;
  titleProps?: React.ComponentProps<"h1">;
  quotationProps?: React.ComponentProps<"h5">;
  showSpotLight?: boolean;
} & React.ComponentProps<"section">;

const Spotlights = [
  {
    className:
      "top-[5vh] left-[0vw] h-[70vh] w-[80vw] sm:top-[8vh] sm:left-[2vw] sm:h-[75vh] sm:w-[60vw] md:top-[5vh] md:left-[-5vw] md:h-[80vh] md:w-[50vw]",
    fill: "white"
  },
  {
    className:
      "top-[10vh] left-[8vw] h-[60vh] w-[75vw] sm:top-[12vh] sm:left-[4vw] sm:h-[65vh] sm:w-[55vw] md:top-[10vh] md:left-[5vw] md:h-[70vh] md:w-[50vw]",
    fill: "var(--secondary)"
  },
  {
    className:
      "top-[15vh] left-[16vw] h-[50vh] w-[70vw] sm:top-[18vh] sm:left-[10vw] sm:h-[60vh] sm:w-[60vw] md:top-[15vh] md:left-[15vw] md:h-[60vh] md:w-[50vw]",
    fill: "var(--primary)"
  }
];





const SectionContainer = ({
  children,
  id,
  title,
  quotation,
  className = "",
  containerProps,
  titleProps,
  quotationProps,
  showSpotLight,
  ...rest
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={"p-4 min-responsive-height w-full overflow-hidden" + className}
      {...rest}
    >
      <ShowIf conditionalRenderKey={showSpotLight}>
        {Spotlights?.map((item, index) => (
          <Spotlight
            key={index}
            className={item.className || ""}
            fill={item.fill || ""}
          />
        ))}
      </ShowIf>
      <h1
        {...titleProps}
        data-aos="flip-up"
        className={`text-center m-0 !text-[clamp(30px, 5vw, 2vw+60px)] capitalize ${
          titleProps?.className || ""
        }`}
        style={{
          fontSize: "clamp(25px, 4vw, 2vw + 45px)",
          ...titleProps?.style
        }}
      >
        <b>{title}</b>
      </h1>
      <ShowIf conditionalRenderKey={quotation}>
        <h5
          {...quotationProps}
          data-aos="flip-up"
          className={`text-center m-0 text-gray-500 ${
            quotationProps?.className || ""
          }`}
          style={{
            fontSize: "clamp(16px, 3vw, 1vw + 5px)",
            ...quotationProps?.style
          }}
        >
          <i>{quotation}</i>
        </h5>
      </ShowIf>
      <div
        {...containerProps}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="1000"
        className={
          "container mx-auto h-full !w-calc-10 " +
          (containerProps?.className || "")
        }
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
