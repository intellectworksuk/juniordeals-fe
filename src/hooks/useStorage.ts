import { Component, useCallback } from "react";

export const useExpirableLocalStorage = () => {
  const getItem = useCallback((key: string) => {
    return localStorage.getItem(key);
  }, []);

  const setItem = useCallback(
    (key: string, value: string, expiry: number | undefined) => {
      // if the expiry time is 0, it means there is no need to add the item
      if (expiry === 0) return;
      localStorage.setItem(key, value);
      let timer: string | number | NodeJS.Timeout | undefined;
      if (expiry) {
        timer = setTimeout(() => {
          removeItem(key);
          timer && clearTimeout(timer);
        }, expiry);
      }
    },
    []
  );

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  const clear = useCallback(() => {
    localStorage.clear();
  }, []);

  return [getItem, setItem, removeItem, clear] as const;
};
