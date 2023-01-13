import { PageHeader } from "./PageHeader";
import React, { ReactNode } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import * as routes from "../../constants/routes";
import { PageFooter } from "./PageFooter";
import { JoinUsSection } from "./JoinUs";
import { ProductDetailPage } from "../Product";
import { AddProductPage } from "../Product/AddProduct";
import { UserType } from "../../enums";
import { ParentProfilePage, ProductStore } from "../../view";
import { UserProductsListPage } from "../User/Profile/UserProducts";
import { UserProductDetailPage } from "../User/Profile/UserProductDetail";
import { DealApprovePage } from "../DealFlow/DealApprove";
import { BarterProductSelectionPage } from "../BarterFlow/ProductSelection";
import { ChatApp } from "../Components/ChatStore/ChatApp";
import { AdminHomePage } from "../Admin/Home";
import { ContactUsPage } from "../Home/ContactUs";
import { AboutUsPage } from "../Home/AboutUs";
import { HowItWorksPage } from "../Home/HowItWorks";
import { QuizListing } from "../Components/QuizListing";
import { PlayQuizPage } from "../User/Quiz/PlayQuiz";
import { EditQuizPage } from "../User/Quiz/EditQuiz";
import { SetupQuizPage } from "../User/Quiz/SetupQuiz";

import aboutUsBanner from "../assets/img/bs-1.jpg"
import howitWorkBanner from "../assets/img/bs-2.jpg"
import contactUsBanner from "../assets/img/bs-3.jpg"
import productBanner from "../assets/img/bs-4.jpg"
import { PrivacyPolicyPage } from "../Home/PrivacyPolicy";
import { CookiePolicyPage } from "../Home/CookiePolicy";
import { TermsPolicyPage } from "../Home/TermPolicy";


const ContentLayout = (props: { children: ReactNode | null | undefined }) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={productBanner}
      />

      <section className="sec-itemized-gallery bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

const ContactUsContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={contactUsBanner}
      />

      <section className="sec-cotact bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

const HowitWorksContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={howitWorkBanner}
      />

      <section className="sec-about-us bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

const ProductContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={productBanner}
      />

      <section className="sec-create-item bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

const ProductDetailContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={productBanner}
      />

      <section className="sec-create-item bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

const AboutUsContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage={aboutUsBanner}
      />

      <section className="sec-about-us bgTexture">
        <div className="msg-block" style={{ padding: "20px" }}>
          {props.children}
        </div>
      </section>

      <JoinUsSection />

      <PageFooter />
    </>
  );
};

export const ContentNavigation = (/*props: { view: string }*/) => {
  const location = useLocation();

  return (
    <>
      {location.pathname.endsWith("contactus") ? (
        <ContactUsContentLayout>
          <Routes>
            <Route path="/contactus" element={<ContactUsPage />}></Route>
          </Routes>
        </ContactUsContentLayout>
      ) : location.pathname.endsWith("aboutus") ? (
        <AboutUsContentLayout>
          <Routes>
            <Route path="/aboutus" element={<AboutUsPage />}></Route>
          </Routes>
        </AboutUsContentLayout>
      ) : location.pathname.endsWith("howitworks") ? (
        <HowitWorksContentLayout>
          <Routes>
            <Route path="/howitworks" element={<HowItWorksPage />}></Route>
          </Routes>
        </HowitWorksContentLayout>
      ) : (
        <ContentLayout>
          <Routes>
            <Route
              path="/global/product/detail"
              element={<ProductDetailPage />}
            ></Route>
            <Route path="/privacy" element={<PrivacyPolicyPage />}></Route>
            <Route path="/cookie" element={<CookiePolicyPage />}></Route>
            <Route path="/terms" element={<TermsPolicyPage />}></Route>
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ContentLayout>
      )}
      {/* <ContentLayout>
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ContentLayout> */}
    </>
  );
};

export const ProtectedNavigationContentNavigation = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.endsWith("/product/add") ||
        location.pathname.endsWith("/product/edit") ? (
        <ProductContentLayout>
          <Routes>
            <Route
              path="/product/add"
              element={<AddProductPage signupType={UserType.PARENT} />}
            ></Route>
            <Route
              path="/product/edit"
              element={<AddProductPage signupType={UserType.PARENT} />}
            ></Route>
          </Routes>
        </ProductContentLayout>
      ) : location.pathname.endsWith("/product/detail") ? (
        <ProductDetailContentLayout>
          <Routes>
            <Route
              path="/user/product/detail"
              element={<UserProductDetailPage />}
            ></Route>
          </Routes>
        </ProductDetailContentLayout>
      ) : (
        <ContentLayout>
          <Routes>
            <Route
              path="/store/product/list"
              element={
                <ProductStore /*timeStamp={new Date().toISOString()}*/ />
              }
            ></Route>
            <Route
              path="/user/product/list"
              element={<UserProductsListPage />}
            ></Route>
            <Route path="/user/quiz/list" element={<QuizListing />}></Route>
            <Route path="/chat/app" element={<ChatApp />}></Route>
            <Route
              path="/parent/home"
              element={
                <ProductStore /*timeStamp={new Date().toISOString()}*/ />
              }
            ></Route>
            <Route
              path="/child/home"
              element={
                <ProductStore /*timeStamp={new Date().toISOString()}*/ />
              }
            ></Route>
            <Route
              path="/product/barter"
              element={<BarterProductSelectionPage />}
            ></Route>
            <Route path="/deal/approve" element={<DealApprovePage />}></Route>
            <Route path="/quiz/setup" element={<SetupQuizPage />}></Route>
            <Route path="/quiz/view" element={<QuizListing />}></Route>
            <Route path="/quiz/play" element={<PlayQuizPage />}></Route>
            <Route path="/quiz/edit" element={<EditQuizPage />}></Route>
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ContentLayout>
      )}
    </>
  );
};

export const ProtectedAdminContentNavigation = () => {
  const location = useLocation();

  return (
    <>
      <ContentLayout>
        <Routes>
          <Route path="/home" element={<AdminHomePage />}></Route>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </ContentLayout>
    </>
  );
};
