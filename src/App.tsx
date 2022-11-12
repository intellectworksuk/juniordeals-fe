import React, { useState } from "react";
import { Layout } from "antd";
import { useEffect } from "react";
import { ErrorBoundary } from "./view";
import { store } from "./store";
import { Router } from "./router";
import "./styles/styles.css";
import "./styles/albery.css";
import * as AuthService from "./store/auth/auth.actions";
import { User } from "./types";
import * as FirestoreService from "./view/Components/ChatStore/firebase/fireStoreService";
import useEffectOnce from "./hooks/useEffectOnce";

const App = () => {
  // const [user, setUser] = useState<User>();
  /**
   * during application first load or refresh
   */

  useEffectOnce(() => {
    // setUser(JSON.parse(sessionStorage.getItem("user.auth")!));

    // store.dispatch(AuthService.loadCurrentUser());
    // store.dispatch(AuthService.loadCurrentProfile());

    // store.dispatch(fetchCountries());
    // store.dispatch(fetchCities(Number(0)));
    // store.dispatch(fetchAreaCoverage());
  });

  return (
    <ErrorBoundary>
      <Layout id="app">
        <Router user={store.getState().auth.user!} />
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
