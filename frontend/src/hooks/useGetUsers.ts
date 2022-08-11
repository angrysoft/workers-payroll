import { useEffect, useState } from "react";
import { useGet } from "./useGet";

type UserType = "all" | "worker" | "coordinator" | "account_manager";

const useGetUsers = (userType: UserType) => {
  const [users, setUsers] = useState([]);
  const {data, loading} = useGet(
      `/api/v1/user/list?page=1&account_type=${userType}`,
  );

  useEffect(()=> {
    if (data.results) {
      setUsers(data.results);
    }
  }, [data]);

  return {users, loading};
};

export { useGetUsers };
