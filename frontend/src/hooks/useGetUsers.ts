import { useEffect, useState } from "react";
import { IUserItem } from "../routes/Workers";
import { useGet } from "./useGet";

type UserType = "all" | "worker" | "coordinator" | "account_manager";

const useGetUsers = (userType: UserType) => {
  const [users, setUsers] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const {data, loading} = useGet(
      `/api/v1/user/list?page=1&account_type=${userType}&items=100`,
  );

  useEffect(()=> {
    if (data && data.results) {
      const userResult = data.results.map((usr: IUserItem)=> {
        return {
          id: usr.id,
          name: `${usr.first_name} - ${usr.last_name}`,
        };
      });
      setUsersName(userResult);
      setUsers(data.results);
    }
  }, [data]);

  return {users, usersName, loading};
};

export { useGetUsers };
