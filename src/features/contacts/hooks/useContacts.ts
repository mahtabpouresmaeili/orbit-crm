import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../services/getContacts';

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
    retry: 1,
    retryDelay: 400,
  });
}
