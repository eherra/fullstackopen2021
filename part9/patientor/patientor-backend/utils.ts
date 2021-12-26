import { NewPatientEntry, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry} from './types';
import { Gender } from './enums';

const parseStringValue = (textValue: unknown): string => {
	if (!textValue || !isString(textValue)) {
		throw new Error('Incorrect or missing string value');
	}

	return textValue;
};

const parseNumberValue = (numberValue: unknown): number => {
  if (!numberValue || isNaN(Number(numberValue))) {
    throw new Error('Incorrect or missing numberValue');
  }
  return Number(numberValue);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing visibility: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStringValue(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseStringValue(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseStringValue(object.occupation),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entries: object.entries,
  };

  return newEntry;
};

export const toNewEntry = (entry: Entry): Entry => {
  switch(entry.type) {
    case 'Hospital':
      const newHospitalEntry: HospitalEntry = {
        type: entry.type,
        id: parseStringValue(entry.id),
        description: parseStringValue(entry.description),
        specialist: parseStringValue(entry.specialist),
        date: parseDate(entry.date),
        discharge: entry.discharge
      };
      return newHospitalEntry;
    case 'OccupationalHealthcare':
      const newOccupationalEntry: OccupationalHealthcareEntry = {
        type: entry.type,
        id: parseStringValue(entry.id),
        description: parseStringValue(entry.description),
        specialist: parseStringValue(entry.specialist),
        date: parseDate(entry.date),
        employerName: parseStringValue(entry.employerName),
        sickLeave: entry.sickLeave
      };
      return newOccupationalEntry;
    case 'HealthCheck':
      const newHealthCheckEntry: HealthCheckEntry = {
        type: entry.type,
        id: parseStringValue(entry.id),
        description: parseStringValue(entry.description),
        specialist: parseStringValue(entry.specialist),
        date: parseDate(entry.date),
        healthCheckRating: parseNumberValue(entry.healthCheckRating),
        diagnosisCodes: entry.diagnosisCodes
      };
      return newHealthCheckEntry;
  }
};

export default toNewPatientEntry;
