import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/store";

const useSelector = (selector: any) => {
  const {state} = useContext(AppContext);
  const watchedSelector = selector(state);

  return watchedSelector;
};

export {useSelector};
