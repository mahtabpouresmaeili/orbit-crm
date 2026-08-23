// Fetches and caches the contacts through TanStack Query.
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../services/getContacts";

export function useContacts(){
    return useQuery({
        queryKey:["contacts"],
        queryFn: getContacts,
    })
}