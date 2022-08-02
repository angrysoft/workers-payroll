import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/store";

const useSelector = (selector: any) => {
  const {state} = useContext(AppContext);
  const watchedSelector = selector(state);
  const [value, setValue] = useState(!null);

  useEffect(()=> {
    setValue(watchedSelector);
  }, [watchedSelector]);
  return value;
};

export {useSelector};
