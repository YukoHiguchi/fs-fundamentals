import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  patients.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry,
};
