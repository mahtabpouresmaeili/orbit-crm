import cors from 'cors';
import express from 'express';
import { createContactSchema } from './schemas/createContactSchema';
import { updateContactSchema } from './schemas/updateContactSchema';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  }),
);
app.use(express.json());

const contacts = [
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

app.get('/', (_request, response) => {
  response.json({ message: 'Orbit CRM API is running.' });
});

app.get('/api/contacts', (_request, response) => {
  response.json(contacts);
});

app.post('/api/contacts', (request, response) => {
  const result = createContactSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json({ errors: result.error.flatten().fieldErrors });
    return;
  }

  const newContact = {
    id: crypto.randomUUID(),
    ...result.data,
    owner: 'Current User',
    potentialValue: 0,
    lastActivity: new Date().toISOString().slice(0, 10),
    marketingConsent: false,
  };

  contacts.push(newContact);
  response.status(201).json(newContact);
});

app.delete('/api/contacts/:id', (request, response) => {
  const contactIndex = contacts.findIndex((contact) => contact.id === request.params.id);

  if (contactIndex === -1) {
    response.status(404).json({ message: 'Contact not found.' });
    return;
  }

  contacts.splice(contactIndex, 1);
  response.status(204).send();
});

app.patch('/api/contacts/:id', (request, response) => {
  const contact = contacts.find((item) => item.id === request.params.id);

  if (!contact) {
    response.status(404).json({ message: 'Contact not found.' });
    return;
  }

  const result = updateContactSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json({ errors: result.error.flatten().fieldErrors });
    return;
  }

  contact.stage = result.data.stage;
  response.json(contact);
});

app.listen(port, () => {
  console.log(`Orbit CRM API is running at http://localhost:${port}`);
});
