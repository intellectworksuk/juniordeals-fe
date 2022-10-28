import React from "react";
import { Button, Empty, Result, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { PageHeader } from "../Layout";

const { Text } = Typography;

export const NotFound = () => {
  return (
    <section className="not-found">
      <Helmet>
        <title>Not Found | JuniorDeals</title>
      </Helmet>
      <PageHeader
        bannerImage="https://images.unsplash.com/photo-1566576912323-1089a9627bca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        useBannerAsStrip={true}
      />
      <div className="container" style={{ marginTop: "450px" }}>
        <div className="not-found__wrapper">
          <Result
            status="404"
            title="404"
            subTitle="The page you're looking for can't be found."
            extra={
              <Button type="primary">
                <Link to={routes.HOME} replace>
                  Back Home
                </Link>
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};
