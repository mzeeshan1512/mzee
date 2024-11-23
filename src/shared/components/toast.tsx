/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";

type ToastType = "success" | "error" | "info" | "warning";

type position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "center";

interface toastProps {
  duration?: number;
  icon?: JSX.Element;
  hideCross?: boolean;
  hideProgress?: boolean;
  hideIcon?: boolean;
}

interface typedToastProps extends toastProps {
  content: string;
  type: ToastType | "custom";
}

interface Toast extends typedToastProps {
  id: number;
  isVisible?: boolean;
}

let addToast: ({ content, duration, type }: typedToastProps) => void = () => {};
let clearToasts: () => void = () => {};

const useToast = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const timers = React.useRef<Map<number, NodeJS.Timeout>>(new Map());
  let timeoutTimers: any = [];

  const clearTimeById = (id: any) => {
    clearTimeout(timeoutTimers.find((t: any) => t.id === id));
  };

  const removeToastById = (id: any) => {
    clearTimeById(id);
    setToasts((prevToasts) => prevToasts.filter((toast) => toast?.id !== id));
  };

  const createToast = (props: typedToastProps) => {
    const timeout = props?.duration || 3000;
    const newToast: Toast = {
      id: Date.now(),
      ...props,
      type: props?.type || "custom",
      duration: timeout,
      isVisible: true
    };

    setToasts((prevToasts) => [newToast, ...prevToasts]);
    const removeTimer = setTimeout(() => removeToastById(newToast.id), timeout);
    timeoutTimers.push({ id: newToast?.id, removeTimer });
  };

  const dismissAllToasts = () => {
    timers.current.forEach((timer) => clearTimeout(timer)); // Clear all timers
    timers.current.clear(); // Clear the timers map
    setToasts([]);
  };

  // Effect to clean up timers when toast list changes
  React.useEffect(() => {
    if (toasts.length === 0) {
      timers.current.forEach((timer) => clearTimeout(timer)); // Clear all timers
      timeoutTimers?.forEach((timer: any) => clearTimeout(timer));
      timers.current.clear();
    }
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer)); // Cleanup on unmount
      timeoutTimers?.forEach((timer: any) => clearTimeout(timer));
    };
  }, [toasts]);
  addToast = createToast;
  clearToasts = dismissAllToasts;

  return { toasts, createToast, dismissAllToasts, removeToastById };
};

const ProgressBar = ({
  duration,
  onComplete,
  color
}: {
  duration: number;
  onComplete: () => void;
  color: string;
}) => {
  const [progress, setProgress] = React.useState(100);
  React.useEffect(() => {
    const interval = 100; // Update every 100ms
    const decrement = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev - decrement;
        if (nextProgress <= 0) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return nextProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div className="absolute bottom-0 left-0 h-1 w-full">
      <div
        className="h-full transition-all"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
};

const ToastContainer = ({
  position = "top-right",
  ...props
}: { position?: position } & React.ComponentProps<"div">) => {
  const { toasts, removeToastById } = useToast();

  const positionToClass: Record<position, string> = {
    "top-left": "top-5 left-5",
    "top-center": "top-5 left-1/2 transform -translate-x-1/2",
    "top-right": "top-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-5 right-5",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  };

  const variantProgressColor: Record<ToastType, string> = {
    success: "darkseagreen",
    error: "#f54242",
    info: "#42adf5",
    warning: "#f5bc42"
  };

  const variantSvg: Record<ToastType, JSX.Element> = {
    success: (
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
        fill={variantProgressColor.success}
      />
    ),
    error: (
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
        fill={variantProgressColor.error}
      />
    ),
    info: (
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"
        fill={variantProgressColor.info}
      />
    ),
    warning: (
      <path
        d="M12 2L1 21h22L12 2zM12 16a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm1-7v5a1 1 0 0 1-2 0V9a1 1 0 0 1 2 0z"
        fill={variantProgressColor.warning}
      />
    )
  };

  if (toasts?.length < 1) {
    return null;
  }

  return (
    <div
      {...props}
      className={`flex flex-col gap-2 fixed z-[200] ${positionToClass[position]}`}
    >
      {toasts?.map((toast) => (
        <div
          key={toast?.id}
          className={`max-w-40 md:max-w-80 rounded bg-slate-300 dark:bg-slate-800 text-black dark:text-white shadow ${
            toast?.isVisible ? "animate-float-in" : "animate-float-out"
          }`}
          // style={{
          //   transitionDelay: `${toast?.duration! / 2}s`
          // }}
        >
          {toast?.type === "custom" ? (
            toast?.content
          ) : (
            <div className="relative flex justify-between items-center gap-2 w-full p-2">
              {toast?.hideIcon ? null : (
                <div className="shrink-0">
                  {toast?.icon ? (
                    toast?.icon
                  ) : (
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      {variantSvg[toast?.type]}
                    </svg>
                  )}
                </div>
              )}
              <span className="flex-1 text-wrap break-before-all break-words">
                {toast?.content}
              </span>
              {toast?.hideCross ? null : (
                <svg
                  className="w-3 h-3 cursor-pointer hover:text-primary-500 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                  onClick={() => removeToastById(toast?.id)}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              )}
              {toast?.hideProgress ? null : (
                <ProgressBar
                  duration={toast?.duration!}
                  onComplete={() => removeToastById(toast?.id)}
                  color={variantProgressColor[toast?.type]}
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const toast = {
  success: (message: string, toastProps?: toastProps) =>
    addToast({ content: message, type: "success", ...toastProps }),
  error: (message: string, toastProps?: toastProps) =>
    addToast({ content: message, type: "error", ...toastProps }),
  info: (message: string, toastProps?: toastProps) =>
    addToast({ content: message, type: "info", ...toastProps }),
  warning: (message: string, toastProps?: toastProps) =>
    addToast({ content: message, type: "warning", ...toastProps }),
  custom: (message: string, toastProps?: toastProps) =>
    addToast({ content: message, type: "custom", ...toastProps }),
  dismiss: () => clearToasts()
};

export default toast;

export { useToast, ToastContainer, addToast, clearToasts };

export type { Toast, ToastType, position, toastProps, typedToastProps };
