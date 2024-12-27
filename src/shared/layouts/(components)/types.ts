import React from "react";
import { LinkProps } from "next/link";
import { ImageProps } from "next/image";

type toolTipPosition = "left" | "right" | "top" | "bottom" | null;

type AppIconProps = {
  baseUrl?: string;
  icon?: JSX.Element | null;
  isCollapsed?: boolean;
  linkProps?: LinkProps;
  imgProps?: ImageProps | React.ComponentProps<"img">;
  hideIcon?: boolean;
};

interface HeaderMenuList {
  title?: string;
  link: string;
  className?: string;
  icon?: JSX.Element;
  toolTipText?: string;
  isStatic?: boolean;
  showOnRoutes?: string[];
  onClickCallBack?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
}

type showLogoAsRoute = {
  show: boolean;
  route: string;
};

type showFloatingStickyNav =  | { floatingMenu: true; showStickyNavRoutesOrId: string } 
  | { floatingMenu?: false; showStickyNavRoutesOrId?: never };

interface MenuProps  {
  verticalLayout?: boolean;
  hideMenu?: boolean;
  isExactPath?: boolean;
  showToolTip?: boolean;
  isCollapsible?: boolean;
  isStaticPageNavigation?: boolean;
  showLogoAsRoute?: showLogoAsRoute;
  toolTipPosition?: toolTipPosition;
  menuList?: HeaderMenuList[];
  staticScrollSpyPath?: string[];
  navTagProps?: React.ComponentProps<"nav">;
  ulTagProps?: React.ComponentProps<"ul">;
  liTagProps?: React.ComponentProps<"li">;
  activeClass?:string;
}

type Header = React.ComponentProps<"header"> & showFloatingStickyNav & {
  hideHeader?: boolean;
  centeredMode?: boolean;
  headerContainerProps?: React.ComponentProps<"div">;
  hideNavOnScroll?:boolean
  appIcon?: AppIconProps;
  menuProps?: MenuProps;
  callBackComponent?: React.ReactNode | JSX.Element;
  
}

type HeaderProps = Header & Record<string, unknown>;

type MobileMenuProps =  {
  appIcon: AppIconProps;
  menuProps: MenuProps;
  close:()=>void,
  open:boolean
}

type FooterProps = {
  footerCallBackComponent?:React.ReactNode,
  footerTagProps?:React.ComponentProps<"footer">
  appIcon?:AppIconProps,
}

export type {
  HeaderMenuList,
  toolTipPosition,
  HeaderProps,
  MenuProps,
  AppIconProps,
  MobileMenuProps,
  FooterProps
};
