import { z } from 'zod';

type ApiRequest = {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  body: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => ApiResponse;
  end: () => ApiResponse;
  setHeader: (name: string, value: string) => void;
};

type Contact = {
  id: string;
  fullName: string;
  email: string;
  company: string;
  stage: 'lead' | 'qualified' | 'customer' | 'inactive';
  owner: string;
  potentialValue: number;
  lastActivity: string;
  marketingConsent: boolean;
};

const contacts: Contact[] = [
  {
    id: '1',
    fullName: 'Amelia Stone',
    email: 'amelia@northstar.com',
    company: 'Northstar Capital',
    stage: 'qualified',
    owner: 'Sam',
    potentialValue: 48000,
    lastActivity: '2026-08-20',
    marketingConsent: true,
  },
  {
    id: '2',
    fullName: 'Jon Bell',
    email: 'jon@lumon.com',
    company: 'Lumon Finance',
    stage: 'customer',
    owner: 'Sara',
    potentialValue: 92000,
    lastActivity: '2026-08-19',
    marketingConsent: true,
  },
];

const updateContactSchema = z.object({
  stage: z.enum(['lead', 'qualified', 'customer', 'inactive']),
});

export default function handler(request: ApiRequest, response: ApiResponse) {
  const id = typeof request.query.id === 'string' ? request.query.id : undefined;

  if (id && request.method === 'DELETE') {
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) return response.status(404).json({ message: 'Contact not found.' });
    contacts.splice(index, 1);
    return response.status(204).end();
  }

  if (id && request.method === 'PATCH') {
    const contact = contacts.find((item) => item.id === id);
    if (!contact) return response.status(404).json({ message: 'Contact not found.' });
    const result = updateContactSchema.safeParse(request.body);
    if (!result.success) {
      return response.status(400).json({ errors: result.error.flatten().fieldErrors });
    }
    contact.stage = result.data.stage;
    return response.status(200).json(contact);
  }

  response.setHeader('Allow', 'DELETE, PATCH');
  return response.status(405).json({ message: 'Method not allowed.' });
}
