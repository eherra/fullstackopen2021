import patientData from './../data/patients';
import {PublicPatient, PatientEntry, NewPatientEntry, Entry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): Array<PatientEntry> => {
  return patientData;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): PatientEntry | undefined => {
  return patientData.find(d => d.id === id);
};

const addEntryToPatient = (id: string, entryData: Entry): Entry | undefined => {
  findById(id)?.entries.push(entryData);
  return entryData;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById,
  addEntryToPatient
};