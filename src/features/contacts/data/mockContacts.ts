import type { Contact } from "../types/contact";

export const mockContacts: Contact[] = [
  {
    id: "1",
    fullName: "Amelia Stone",
    email: "amelia@northstar.com",
    company: "Northstar Capital",
    stage: "qualified",
    owner: "Sam",
    potentialValue: 48000,
    lastActivity: "2026-08-20",
    marketingConsent: true,
  },
  {
    id: "2",
    fullName: "Jon Bell",
    email: "jon@lumon.com",
    company: "Lumon Finance",
    stage: "customer",
    owner: "Sara",
    potentialValue: 92000,
    lastActivity: "2026-08-19",
    marketingConsent: true,
  },
  {
    id: "3",
    fullName: "Priya Shah",
    email: "priya@harborline.com",
    company: "Harborline Logistics",
    stage: "lead",
    owner: "Mahtab",
    potentialValue: 18000,
    lastActivity: "2026-08-17",
    marketingConsent: false,
  },
];