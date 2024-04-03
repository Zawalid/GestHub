import { useQuery } from "@tanstack/react-query";
import { getAllInterns, getIntern } from "./api/internsAPI";
import { getAllOffers } from "./api/offersAPI";
import { getAllSupervisors, getSupervisor } from "./api/supervisorsAPI";

// Interns
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

// Supervisors
export function useSupervisors() {
  const { data, error, isPending } = useQuery({
    queryKey: ["supervisors"],
    queryFn: getAllSupervisors,
  });

  return { supervisors: data, error, isLoading: isPending };
}

export function useSupervisor(id) {
  const { data, error, isPending } = useQuery({
    queryKey: ["supervisor", id],
    queryFn: () => getSupervisor(id),
  });

  return { supervisor: data, error, isLoading: isPending };
}

//oofers

// Interns
export function useOffers() {
  const { data, error, isPending } = useQuery({
    queryKey: ["offers"],
    queryFn: getAllOffers,
  });

  return { offers: data, error, isLoading: isPending };
}