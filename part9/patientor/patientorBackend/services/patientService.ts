/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../data/patients';
import { NewPatientEntry, PatientEntry, PublicPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PublicPatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const findPatientById = (id: string): PatientEntry | undefined  => {
  return patients.find(patient => patient.id === id);
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const id = uuidv4();

	const newPatientEntry = {
		id: id,
		...entry
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  findPatientById
};