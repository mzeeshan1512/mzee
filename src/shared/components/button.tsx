import React from "react";
import ShowIf from "./show-if";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

enum BlendMode {
  OUTLINE = "outline",
  GRADIENT = "gradient",
  DEFAULT = "default"
}

enum NA {
  NA = ""
}

type ConditionalButtonParameters =
  | {
      children: React.ReactNode;
      buttonDisplayText?: never;
    }
  | {
      children?: never;
      buttonDisplayText?: string;
    };

type ButtonProps = React.ComponentProps<"button"> &
  ConditionalButtonParameters & {
    variant?: ButtonVariant | null;
    disabled?: boolean;
    isLoading?: boolean;
    Loader?: React.ReactNode;
    blendMode?: BlendMode | NA;
  };

// TODO: When fix taildwind config for dynamically generated class using js, uncomment this
// Base color definitions
// const colors: Record<ButtonVariant, string> = {
//   primary: "primary",
//   secondary: "secondary",
//   success: "green",
//   danger: "red",
//   warning: "yellow",
//   info: "teal"
// };

// // Generate class map for each variant and blendMode
// const classMap: Record<ButtonVariant, Record<BlendMode, string>> = Object.keys(
//   colors
// ).reduce((acc, variant) => {
//   const color = colors[variant as ButtonVariant];
//   acc[variant as ButtonVariant] = {
//     [BlendMode.DEFAULT]: `text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 focus:outline-none dark:focus:ring-${color}-800`,
//     [BlendMode.OUTLINE]: `text-${color}-700 hover:text-white border border-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-${color}-500 dark:text-${color}-500 dark:hover:text-white dark:hover:bg-${color}-500 dark:focus:ring-${color}-800`,
//     [BlendMode.GRADIENT]: `text-white bg-gradient-to-r from-${color}-500 via-${color}-600 to-${color}-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:focus:ring-${color}-800 shadow-lg shadow-${color}-500/50 dark:shadow-lg dark:shadow-${color}-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`,
//     [BlendMode.OUTLINE_GRADIENT]: `relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-${color}-100 to-${color}-500 group-hover:from-purple-600 group-hover:to-${color}-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800`
//   };
//   return acc;
// }, {} as Record<ButtonVariant, Record<BlendMode, string>>);

const classMap: Record<ButtonVariant, Record<BlendMode, string>> = {
  primary: {
    [BlendMode.DEFAULT]:
      "text-white bg-primary-700 hover:bg-primary-800 focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-800 focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:bg-gradient-to-br focus:outline-none"
  },
  secondary: {
    [BlendMode.DEFAULT]:
      "text-white bg-secondary-700 hover:bg-secondary-800 focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-secondary-700 hover:text-white border border-secondary-700 hover:bg-secondary-800 focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700 hover:bg-gradient-to-br focus:outline-none"
  },
  success: {
    [BlendMode.DEFAULT]:
      "text-white bg-green-700 hover:bg-green-800 focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-green-700 hover:text-white border border-green-700 hover:bg-green-800  focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:outline-none"
  },
  danger: {
    [BlendMode.DEFAULT]:
      "text-white bg-red-700 hover:bg-red-800  focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none"
  },
  warning: {
    [BlendMode.DEFAULT]:
      "text-white bg-yellow-700 hover:bg-yellow-800  focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800  focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:outline-none"
  },
  info: {
    [BlendMode.DEFAULT]:
      "text-white bg-teal-700 hover:bg-teal-800  focus:outline-none",
    [BlendMode.OUTLINE]:
      "text-teal-700 hover:text-white border border-teal-700 hover:bg-teal-800  focus:outline-none",
    [BlendMode.GRADIENT]:
      "text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:outline-none"
  }
};

const Button = ({
  variant = "primary",
  blendMode = BlendMode.DEFAULT,
  disabled = false,
  isLoading = false,
  Loader,
  className = "",
  children,
  buttonDisplayText,
  ...rest
}: ButtonProps) => {
  // Type guard to check if blendMode is a valid BlendMode
  const isBlendMode = (mode: BlendMode | NA): mode is BlendMode =>
    mode !== NA.NA;
  const variantBlendClass =
    blendMode && variant && isBlendMode(blendMode)
      ? classMap[variant][blendMode as BlendMode]
      : "";
  const baseClasses =
    "flex justify-center items-center btn ms-0 rounded p-2 font-medium rounded-lg text-sm";
  const combinedClasses = `${baseClasses} ${variantBlendClass} ${
    className || ""
  }`;

  const renderLoader = () => (
    <ShowIf
      conditionalRenderKey={Loader}
      elseComponent={
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600"
          viewBox="0 0 100 101"
          fill="none"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      }
    >
      {Loader}
    </ShowIf>
  );

  const renderChildContent = () => (
    <ShowIf
      conditionalRenderKey={children}
      elseCallBackMessage={buttonDisplayText}
    >
      {children}
    </ShowIf>
  );

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      <ShowIf conditionalRenderKey={!isLoading} elseComponent={renderLoader()}>
        {renderChildContent()}
      </ShowIf>
    </button>
  );
};

export default Button;

export type { ButtonProps, ConditionalButtonParameters, ButtonVariant };
// enum exports
export { BlendMode, NA };
