import { State } from "./state";
import { DiagnoseEntry, Patient, HealthCheckEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_SINGLEFETCHED_PATIENT";
    payload: Patient;
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: DiagnoseEntry[];
  }
  | {
    type: "ADD_PATIENT_ENTRY";
    payload: { 
      patientId: string, 
      entry: HealthCheckEntry 
    }
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_SINGLEFETCHED_PATIENT":
      return {
        ...state,
        singleFetchedPatients: {
          ...state.singleFetchedPatients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
      case "ADD_PATIENT_ENTRY":
        return {
          ...state,
          singleFetchedPatients: {
            ...state.singleFetchedPatients,
            [action.payload.patientId]: {
              ...state.singleFetchedPatients[action.payload.patientId],
              entries: [
                ...(state.singleFetchedPatients[action.payload.patientId].entries || []),
                action.payload.entry
              ]
            }
          }
        };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[] ): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const setDiagnosisList = (diagnosis: DiagnoseEntry[] ): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosis
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const addSingleFetchedPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_SINGLEFETCHED_PATIENT',
    payload: patient
  };
};

export const addEntryForPatient = (patientId: string, entry: HealthCheckEntry): Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload: { patientId, entry }
  };
};