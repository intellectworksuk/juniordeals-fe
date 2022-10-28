/*
Thanks to Karl Hadwen for this (https://github.com/karlhadwen/instagram/blob/master/src/hooks/use-auth-listener.js)
*/

import { useState, useEffect } from "react";
import { useFireBase } from "./config";

export const useAuthListener = () => {
  const [auth, fs] = useFireBase();

  const [user, setUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser.uid);
      } else setUser(undefined);
    });

    return () => listener();
  }, []);

  return { user };
};
