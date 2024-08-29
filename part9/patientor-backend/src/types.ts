import { z } from 'zod';

import { NewEntrySchema } from './utils';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = z.infer<typeof NewEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
