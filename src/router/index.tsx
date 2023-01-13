import { Navigate, Route, Routes } from "react-router-dom";
import { Component } from "react";
import {
  ContentNavigation,
  FormNavigation,
  HomePage,
  NotFound,
  ProductList,
  ProtectedNavigationContentNavigation,
  SignupNavigation,
} from "../view";
import { ProtectedAdminRoute, ProtectedRoute } from "./PrivateRoute";
import { User } from "../types";
import { SetupContentNavigation } from "../view/Layout/FormLayout";
import { LoginNavigation } from "../view/Layout/SignupLayout";
import { MaintenancePage } from "../view/Home/Maintenance";
import { ProtectedAdminContentNavigation } from "../view/Layout/ContentLayout";
import { PrivacyPolicyPage } from "../view/Home/PrivacyPolicy";

/**
 * Top level application router
 *
 * @returns {Component}
 */
export const Router = ({ user }: { user: User }) => {
  // console.log("user"+JSON.stringify(user));

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/user/*" element={<LoginNavigation />}></Route>
      <Route path="/account/*" element={<FormNavigation />}></Route>
      <Route
        path="/view/*"
        element={<ContentNavigation />}
      ></Route>
      {/* <Route
        path="/view/*"
        element={<ContentNavigation view="aboutus" />}
      ></Route> */}
      <Route
        path="/form/*"
        element={
          <ProtectedRoute>
            <FormNavigation />
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/user/setup/*" element={<SignupNavigation />}></Route>
      <Route
        path="/user/content/*"
        element={
          <ProtectedRoute>
            <SetupContentNavigation />
          </ProtectedRoute>
        }
      ></Route>
      {/* <Route
        path="/view/*"
        element={
          <ProtectedRoute
          isAllowed={!!user !!user.permissions && user.permissions!.includes("view")}
          >
            <ContentNavigation />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/navigate/*"
        element={
          <ProtectedRoute
          // isAllowed={!!user.id /*&& !!user.permissions && user.permissions!.includes("view")*/}
          >
            <ProtectedNavigationContentNavigation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedAdminRoute
          // isAllowed={!!user.id /*&& !!user.permissions && user.permissions!.includes("view")*/}
          >
            <ProtectedAdminContentNavigation />
          </ProtectedAdminRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
};
