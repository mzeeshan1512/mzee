import React, { ComponentProps } from "react";
import TrustedRedirect, { TrustedRedirectProps } from "../trusted-redirect";
import "./style.css";

interface SocialShareContent {
  title?: string;
  link?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content?: string;
  label?: string;
  color?: string;
  isTrusted?: boolean;
}

interface SocialShareProps {
  size?: number;
  socialContact?: SocialShareContent[];
}

const SocialIcons = ({
  size = 15,
  socialContact = [],
  linkProps,
  ...rest
}: SocialShareProps &
  ComponentProps<"div"> & {
    linkProps?: TrustedRedirectProps;
  }) => {
  return (
    <div className="social-icons" {...rest}>
      {socialContact?.map((data, index) => (
        <TrustedRedirect
          {...linkProps}
          href={`${data?.link}`}
          className={`icon mx-1 ${linkProps?.className || ""}`}
          style={
            {
              "--icon-size": "2em",
              "--hover-bg": data.color,
              ...linkProps?.style
            } as React.CSSProperties
          }
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
          key={index}
          target={linkProps?.target || "_blank"}
          title={data?.title}
          isTrusted={
            data?.isTrusted ||
            process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
          }
        >
          {<data.icon width={size} height={size} />}
        </TrustedRedirect>
      ))}
    </div>
  );
};

export default SocialIcons;

export type { SocialShareContent, SocialShareProps };
