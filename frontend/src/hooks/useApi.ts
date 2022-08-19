import { useState } from "react";

type IFetchMethod = "GET" | "POST" | "PUT" | "DELETE";

interface IFetchOptions {
  method: IFetchMethod;
  headers?: object;
  data?: any;
}

const useApi = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<number>(0);

  const call = (url: string, options: IFetchOptions) => {
    setLoading(true);
    setResults(null);
    setError("");
    setCode(0);
    const token:string = localStorage.getItem("token") || "";
    const fetchOptions: any = {
      method: options.method || "GET",
      headers: {
        "Authorization": token,
      },
    };
    if (options.method !== "GET" && options.data) {
      fetchOptions.body = JSON.stringify(options.data);
    }

    fetch(url, fetchOptions).then((response) =>{
      if ([200, 201].includes(response.status)) {
        response.json().then((data) => {
          setResults(data);
        })
            .catch((err) => setError(err.toString()));
      } else if ([400, 401].includes(response.status)) {
        response.json().then((data) => {
          setError(data["error"]);
        });
      }
      setCode(response.status);
      setLoading(false);
    });
  };
  return {results, loading, error, code, call};
};

export {useApi};
export type {IFetchOptions, IFetchMethod};
