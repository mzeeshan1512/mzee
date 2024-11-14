import React from "react";

export type SectionContainerProps = {
  id: string;
  title: string;
  quotation?: string;
  children: React.ReactNode;
  containerProps?: React.ComponentProps<"div">;
  titleProps?: React.ComponentProps<"h1">;
  quotationProps?: React.ComponentProps<"h5">;
} & React.ComponentProps<"section">;

const SectionContainer = ({
  children,
  id,
  title,
  quotation,
  className = "",
  containerProps,
  titleProps,
  quotationProps,
  ...rest
}: SectionContainerProps) => {
  return (
    <section
      id={id}
      className={"p-4 min-responsive-height w-full " + className}
      {...rest}
    >
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
      {quotation && (
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
      )}
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
