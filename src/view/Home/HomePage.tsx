import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../../hooks/reduxHooks";
import { store } from "../../store";
import {
  PageFooter,
  PageHeader,
  JoinUsSection,
  TopSellersSection,
  AllProductStore,
  ProductLatestList,
} from "../../view";
import bannerImg from "../../view/assets/img/banner.jpg";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Junior Deals</title>
      </Helmet>

      <PageHeader bannerImage={bannerImg} useBannerAsStrip={false} />

      <ProductLatestList />

      {/* <ClientTeleSection /> */}

      <AllProductStore /*timeStamp={new Date().toISOString()}*/ />

      {/* <TopSellersSection /> */}

      <JoinUsSection />

      <PageFooter />
    </>
  );
};
