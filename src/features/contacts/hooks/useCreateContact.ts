import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../services/createContact";
import type { Contact } from "../types/contact";

export function useCreateContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createContact,

        onSuccess: (newContact) => {
            queryClient.setQueryData<Contact[]> (
                ["contacts"],
                (prevContact = []) => [
                    newContact,
                    ...prevContact
                ],
            );
        },
    });
}