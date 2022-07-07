import { useState, useEffect } from 'react';


const useGet = (url: string) => {
  const token:string = localStorage.getItem("token") || "";
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [code, setCode] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    setResults(null);
    setError("");
    const fetchOptions: any = {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    };

    fetch(url, fetchOptions).then((response) =>{
      if (response.ok) {
        response.json().then((results) => {
          setResults(results);
        })
            .catch((err) => setError(err.toString()));
      }
      setCode(response.status);
      setLoading(false);
    });
  }, []);

  return { results, loading, error, code };
};

export {useGet};
