type ThemeState = {
  mode: "light" | "dark";
};

type LightModeAction = {
  type: "LightMode";
};

type DarkModeAction = {
  type: "DarkMode";
};

type ThemeAction = LightModeAction | DarkModeAction;

type LayoutState = {
    layout: "horizontal" | "vertical";
  };
  
  type HorizontalLayoutAction = {
    type: "HorizontalLayout";
  };
  
  type VerticalLayoutAction = {
    type: "VerticalLayout";
  };
  
  type LayoutAction = HorizontalLayoutAction | VerticalLayoutAction;
  
  