import { useQuery } from "@tanstack/react-query";
import { getAllInterns, getIntern } from "./api/internsAPI";

export function useInterns() {
  const { data, error, isPending } = useQuery({
    queryKey: ["interns"],
    queryFn: getAllInterns,
  });

  return { interns: data, error, isLoading: isPending };
}

export function useIntern(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["intern", id],
    queryFn: () => getIntern(id),
  });

  return { intern: data, error, isLoading: isPending };
}
