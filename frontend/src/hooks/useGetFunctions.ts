import { useEffect, useState } from "react";
import { IOptions } from "../components/elements/Select";
import { useGet } from "./useGet";

const useGetFunctions = () => {
  const [functionNames, setFunctionNames] = useState<Array<IOptions>>([]);
  const { data, loading } = useGet("/api/v1/event/functions");

  useEffect(() => {
    data && setFunctionNames(data.results);
  }, [data]);
  return {functionNames, loading};
};

export {useGetFunctions};
