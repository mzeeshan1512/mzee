import React, { ReactNode, ErrorInfo } from "react";
import Button from "@/shared/components/button";
import FallBackError from "@/shared/layouts/fall-back-layout";

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
    return { hasError: true,
      errorMessage: error.message
     };
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
        <FallBackError message={this.state.errorMessage || "Oops, there is an error!"} code="OOPS">
          <div className="d-flex justify-content-center">
          <Button
            type="button"
            variant="danger"
            outline
            onClick={() => this.setState({ hasError: false, errorMessage:null })}
          >
            Try again?
          </Button>
          </div>
        </FallBackError>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
