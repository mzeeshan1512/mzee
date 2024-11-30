import React from "react";
import SocialIcons from "../social-share";
import { socialContact } from "@/shared/constants-enums/navigation-list";
import ContactForm from "./form";

type Props = {
  contentProps?: React.ComponentProps<"h1">;
  leftContainerProps?: React.ComponentProps<"div">;
  mainContainerProps?: React.ComponentProps<"div">;
};

const ContactUs = ({
  contentProps,
  leftContainerProps,
  mainContainerProps
}: Props) => {
  return (
    <div
      {...mainContainerProps}
      className={
        "relative grid grid-flow-row md:grid-cols-2 gap-8 items-center " +
        (mainContainerProps?.className || "")
      }
    >
      <div
        {...leftContainerProps}
        className={"flex flex-col gap-3 " + leftContainerProps?.className}
      >
        <h1
          {...contentProps}
          className={
            "text-[clamp(20px,2vw,2vw+15px)] " + (contentProps?.className || "")
          }
        >
          Got questions or an idea to bring to life? Let’s connect—I’m here to
          help make it happen!
        </h1>
        {
          <SocialIcons
            socialContact={socialContact}
            className="!flex !flex-col !gap-4"
            linkProps={{
              className: "flex gap-4 items-center"
            }}
            showTitle
          />
        }
      </div>
      <ContactForm />
    </div>
  );
};

export default ContactUs;
