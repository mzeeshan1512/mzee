import React, { ComponentProps } from "react";
import Link, { LinkProps } from "next/link";
import { Email, GitHub, LinkedIn, WhatsApp } from "@/shared/icon/social";
import "./style.css";

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

const social_Contact: SocialShareContent[] = [
  {
    title: process.env.NEXT_PUBLIC_LINKEDIN,
    icon: LinkedIn,
    link: `https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN}`,
    color: "#0077b5",
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_GITHUB,
    icon: GitHub,
    link: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB}`,
    color: "linear-gradient(to right, #ffbf00, #cc0c40)",
    isPrimaryColorTitle: true,
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_EMAIL,
    icon: Email,
    link: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    color: "linear-gradient(to right, #ffbf00, #cc0c40)",
    isPrimaryColorTitle: true,
    isTrusted: true
  },
  {
    title: process.env.NEXT_PUBLIC_WHATSAPP,
    icon: WhatsApp,
    link: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`,
    color: "rgb(37, 211, 102)",
    isTrusted: true
  }
];

const SocialIcons = ({
  size = 15,
  socialContact = social_Contact,
  linkProps,
  showTitle,
  className,
  ...rest
}: SocialShareProps &
  ComponentProps<"div"> & {
    showTitle?: boolean;
    linkProps?: LinkProps;
  }) => {
  return (
    <div className={`social-icons !gap-x-4 ${className || ""}`} {...rest}>
      {socialContact?.map((data, index) => (
        <Link
          {...linkProps}
          href={`${data?.link}`}
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
          key={index}
          target={"_blank"}
          title={data?.title}
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
        </Link>
      ))}
    </div>
  );
};

export default SocialIcons;

export type { SocialShareContent, SocialShareProps };
