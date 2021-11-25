/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../data/patients';
import { NewPatientEntry, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): PatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const id = uuidv4();

	const newPatientEntry = {
		id: id,
		...entry
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
  getEntries,
  addPatient
};