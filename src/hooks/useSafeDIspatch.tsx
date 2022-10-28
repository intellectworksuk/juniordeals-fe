import {
  AnyAction,
  AsyncThunkAction,
  AsyncThunkPayloadCreator,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import React, { useCallback, useLayoutEffect, useRef } from "react";

interface SafeDispatchProps {
  typePrefix: string;
  payloadCreator: any;
}

export function useSafeDispatch(dispatch: AsyncThunkAction<any, any, {}>) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (prefix: ThunkDispatch<unknown, unknown, AnyAction>, args: any) =>
      mounted.current ? dispatch(prefix, args, {}) : void 0,
    [dispatch]
  );
}
