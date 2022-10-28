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

const ContentLayout = (props: { children: ReactNode | null | undefined }) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
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
        bannerImage="https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
        bannerImage="https://images.unsplash.com/photo-1566577134624-6f6cc4bb272b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
        bannerImage="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=80"
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

const ProductDetailContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.pexels.com/photos/1449934/pexels-photo-1449934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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

const AboutUsContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
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
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
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
            <Route
              path="/global/product/detail"
              element={<ProductDetailPage />}
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
