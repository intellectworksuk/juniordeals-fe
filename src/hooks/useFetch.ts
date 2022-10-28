import { useEffect, useState } from "react";
import http from "../util/http";

const useFetch = <T>(url: string) => {
  const [responses, setResponses] = useState<T[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    // const source = http.CancelToken.source();
    http
      .get(
        `http://jsonplaceholder.typicode.com/${url}` /*, { cancelToken: source.token }*/
      )
      .then((resp) => {
        setIsLoading(false);
        setIsError(false);
        setResponses(resp.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setResponses(null);
      });
    return () => {};
  }, [url]);

  return [responses, isLoading, isError] as const;
};

export default useFetch;
