import { Button, Result } from "antd";
import React, { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

interface ErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundary extends React.Component<
  { children?: ReactNode | undefined },
  ErrorBoundaryState
> {
  constructor(props: Readonly<{ children?: ReactNode | undefined }>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <Helmet>
            <title>Error | JuniorDeals</title>
          </Helmet>
          <Result
            status="500"
            title="500"
            subTitle={`We're sorry — something went wrong.
              Our team has been notified. This issue must be fixed soon.
             But, you can directly report this issue by contacting via : info@gmail.com
              `}
            extra={
              <Button type="primary">
                <Link to={routes.HOME} replace>
                  Back Home
                </Link>
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
