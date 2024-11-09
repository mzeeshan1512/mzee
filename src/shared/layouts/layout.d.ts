interface HeaderMenuList {
  title: string;
  link: string;
  className?: string;
  icon?: any;
  toolTipText?:string
}

interface MenuProps {
  isStaticPageNavigation?: boolean;
  navMenuList?: HeaderMenuList[];
}

interface HeaderProps extends MenuProps {
  hideNavMenu?: boolean;
  hideLogo?: boolean;
  isVerticalLayout?: boolean;
  headerContentClass?: string;
  baseUrl?: string;
  callBackHeaderComponent?: any;
}

type LayoutHandlerList = "whatsapp" | "theme-toggler" | "layout-toggler";

interface SideBarProps extends MenuProps {
  hideSideBar?: boolean;
  baseUrl?: string;
}

interface FooterProps {
  footerCallbackComponent?: any;
  baseUrl?: any;
  hideLogo?: boolean;
  footerContentClass?: string;
}

interface SettingProps {
  excludeSettingsList?: LayoutHandlerList[];
}

type LayoutProps = {
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideSettings?: boolean;
  hiderScrollToTop?: boolean;
  baseUrl?: string;
} & HeaderProps &
  SideBarProps &
  MenuProps &
  FooterProps &
  SettingProps;
