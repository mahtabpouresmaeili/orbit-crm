import type { CreateContactInput } from "../schemas/createContactSchema";
import type { Contact } from "../types/contact";

export async function createContact (input:CreateContactInput):Promise<Contact> {
 await new Promise ((resolve) => setTimeout(resolve,500))

 return {
  id: crypto.randomUUID(),
  ...input,
  owner: "Current User",
  potentialValue: 0,
  lastActivity: new Date().toISOString().slice(0, 10),
  marketingConsent: false,
 }
}
