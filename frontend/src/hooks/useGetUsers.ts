import { useGet } from "./useGet";

type UserType = "all" | "worker" | "coordinator" | "account_manager";

const useGetUsers = (userType: UserType) => {
  const {data, loading} = useGet(
      `/api/v1/user/list?page=1&account_type=${userType}`,
  );

  return {data, loading};
};

export { useGetUsers };
