import { getUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
  };
};
