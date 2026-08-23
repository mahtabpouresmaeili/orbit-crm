// Simulates an API request by returning contacts after a short network delay.
import { mockContacts } from "../data/mockContacts"
import type { Contact } from "../types/contact"

export async function getContacts():Promise<Contact[]> {
    await new Promise((resolve) => setTimeout(resolve,500))
    return mockContacts
}