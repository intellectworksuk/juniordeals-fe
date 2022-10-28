import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { UserType } from "../../enums";
import { DealDonePage } from "../DealFlow/DealDone";
import { CardPaymentPage } from "../Payment/PaymentPage";
import { AccountActivate } from "../User/Activate";
import { EditProfilePage } from "../User/EditProfile";
import { ForgetPasswordPage } from "../User/ForgetPassword";
import { ParentProfilePage } from "../User/Profile/ParentProfile";
import { ResetPasswordPage } from "../User/ResetPassword";
import { JoinUsSection } from "./JoinUs";
import { PageFooter } from "./PageFooter";
import { PageHeader } from "./PageHeader";

const FormLayout = (props: { children: ReactNode | null | undefined }) => {
  const location = useLocation();

  const [divHeight, setDivHeight] = useState<string>("700px");

  useEffect(() => {
    if (location.pathname.endsWith("update/profile")) {
      setDivHeight("1000px");
    }
  }, [location]);

  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
      />
      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: `${divHeight}` }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://webneel.com/daily/sites/default/files/images/daily/02-2021/14-funny-3d-model-character-will-smith-gabriel-soares.jpg')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  );
};

const PasswordRecoveryFormLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
      />
      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: "550px" }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505616485412-adfcd5561e31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  );
};

const PasswordResetFormLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80"
      />
      <section className="sec-form-controller">
        <div className="gen-form-holder" style={{ height: "550px" }}>
          <div className="form-block">
            <main>{props.children}</main>
          </div>
          <div
            className="img-block"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1611957082141-c449bb2b4ada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')",
            }}
          ></div>
        </div>
      </section>
      <JoinUsSection />
      <PageFooter />
    </>
  );
};

export const FormNavigation = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.endsWith("forgetpwd") ? (
        <PasswordRecoveryFormLayout>
          <Routes>
            <Route path="/forgetpwd" element={<ForgetPasswordPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </PasswordRecoveryFormLayout>
      ) : location.pathname.endsWith("resetpwd") ? (
        <PasswordResetFormLayout>
          <Routes>
            <Route path="/resetpwd" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </PasswordResetFormLayout>
      ) : (
        <FormLayout>
          <Routes>
            <Route path="/activate" element={<AccountActivate />} />
            <Route path="/update/profile" element={<EditProfilePage />} />
            <Route path="/deal/create" element={<DealDonePage />} />
            <Route path="/user/payment" element={<CardPaymentPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </FormLayout>
      )}
    </>
  );
};

export const ProductFormContentNavigation = () => {
  const location = useLocation();

  return (
    <>
      <FormLayout>
        <Routes>
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </FormLayout>
    </>
  );
};

const SetupContentLayout = (props: {
  children: ReactNode | null | undefined;
}) => {
  return (
    <>
      <PageHeader
        useBannerAsStrip={true}
        bannerImage="https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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

export const SetupContentNavigation = () => {
  const location = useLocation();

  return (
    <>
      <SetupContentLayout>
        <Routes>
          <Route
            path="/profile"
            element={<ParentProfilePage signupType={UserType.PARENT} />}
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </SetupContentLayout>
    </>
  );
};
