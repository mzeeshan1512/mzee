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
        className={`text-center m-0 mt-2 pt-2 ${titleProps?.className || ""}`}
      >
        <b>{title}</b>
      </h1>
      {quotation && (
        <h5
          {...quotationProps}
          data-aos="flip-up"
          className={`text-center m-0 mt-2 text-gray ${
            quotationProps?.className || ""
          }`}
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
          "container mx-auto h-full mt-4 pt-4" +
          (containerProps?.className || "")
        }
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
