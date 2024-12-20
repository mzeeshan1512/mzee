"use client";
import React, { ReactNode, ErrorInfo } from "react";
import FallBackError from "./fall-back-layout";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <FallBackError
          message={this?.state?.errorMessage || "Oops, there is an error!"}
          code="OOPS"
        >
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800  focus:outline-none rounded-lg p-2"
              onClick={() =>
                this.setState({ hasError: false, errorMessage: null })
              }
            >
              Try again?
            </button>
          </div>
        </FallBackError>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
