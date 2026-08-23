export type LifecycleStage = 'lead' | 'qualified' | 'customer' | 'inactive';

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  company: string;
  stage: LifecycleStage;
  owner: string;
  potentialValue: number;
  lastActivity: string;
  marketingConsent: boolean;
}
