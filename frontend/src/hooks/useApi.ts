import { useState } from "react";

interface IFetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: object;
  data?: any;
}

const useApi = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<number>(0);

  const call = (url: string, options: IFetchOptions) => {
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
      if (response.ok) {
        response.json().then((data) => {
          console.log("setResults", data);
          setResults(data);
        })
            .catch((err) => setError(err.toString()));
      }
      setCode(response.status);
      setLoading(false);
    });
  };
  return {results, loading, error, code, call};
};

export {useApi};
