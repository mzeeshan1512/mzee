import React, { ComponentProps } from "react";
import TrustedRedirect, { TrustedRedirectProps } from "../trusted-redirect";
import "./style.css";
import { socialContact as SC } from "@/shared/constants-enums/navigation-list";

interface SocialShareContent {
  title?: string;
  link?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  content?: string;
  label?: string;
  color?: string;
  isTrusted?: boolean;
  isPrimaryColorTitle?: boolean;
}

interface SocialShareProps {
  size?: number;
  socialContact?: SocialShareContent[];
}

const SocialIcons = ({
  size = 15,
  socialContact = SC,
  linkProps,
  showTitle,
  className,
  ...rest
}: SocialShareProps &
  ComponentProps<"div"> & {
    linkProps?: TrustedRedirectProps;
    showTitle?: boolean;
  }) => {
  return (
    <div className={`social-icons !gap-2 ${className || ""}`} {...rest}>
      {socialContact?.map((data, index) => (
        <TrustedRedirect
          {...linkProps}
          href={`${data?.link}`}
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
          <div
            className={`icon`}
            style={
              {
                "--icon-size": "2em",
                "--hover-bg": data.color
              } as React.CSSProperties
            }
          >
            {<data.icon width={size} height={size} />}
          </div>
          {showTitle && (
            <span
              className="link-title"
              style={
                {
                  "--icon-size": "2em",
                  "--hover-bg": data?.isPrimaryColorTitle
                    ? "var(--primary)"
                    : data?.color
                } as React.CSSProperties
              }
            >
              {data?.title}
            </span>
          )}
        </TrustedRedirect>
      ))}
    </div>
  );
};

export default SocialIcons;

export type { SocialShareContent, SocialShareProps };
