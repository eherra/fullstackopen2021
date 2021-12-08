import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
    useParams
  } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const[patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!patient) {
    return null;
  }

  return (
    <div className="App">
      <h2>{patient.name}</h2>
      <div>
        ssn: {patient.ssn} <br/>
        occupation: {patient.occupation} <br/>
      </div>
    </div>
  );
};

export default PatientPage;