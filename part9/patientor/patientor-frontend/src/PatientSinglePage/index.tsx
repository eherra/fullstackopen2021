import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addSingleFetchedPatient, addEntryForPatient } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { Patient, Entry, HealthCheckEntry } from "../types";
import { Icon, Item, Button } from "semantic-ui-react";
import HospitalEntryValue from "../components/HospitalEntryValue";
import OccupationalHealthcareValue from "../components/OccupationalHealthcareValue";
import HealthCheckValue from "../components/HealthCheckValue";
import AddEntryModal from "../AddEntryModal";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryValue entry={entry}/>;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareValue entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckValue entry={entry}/>;
        default:
            return assertNever(entry);
    }
};

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
const PatientSinglePage: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [{ singleFetchedPatients, diagnosis }, dispatch] = useStateValue();
    
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
  
    const submitNewEntry = async (values: HealthCheckEntry) => {
      try {
        const { data: newEntry } = await axios.post<HealthCheckEntry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(addEntryForPatient(id, newEntry));
        closeModal();
      } catch (e: any) {
        console.error(e.response?.data || 'Something went wrong. Check form values!');
        setError(e.response?.data || 'Something went wrong. Check form values!');
      }
    };

    useEffect(() => {    
        if (singleFetchedPatients[id]) {
            return;
        }

        const fetchPatientSingle = async () => {
          try {
            const {data: fetchedPatient} = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addSingleFetchedPatient(fetchedPatient));
          } catch (e) {
            console.error(e);
          }
        };
        void fetchPatientSingle();
      }, [dispatch]);
    
    if (!singleFetchedPatients[id] || !diagnosis) {
        return <h3>loading data...</h3>;
    }

    const patient = singleFetchedPatients[id];

    const getGenderIcon = () => {
        switch (patient.gender) {
            case 'male':
                return <Icon name='mars' />;
            case 'female':
                return <Icon name='venus' />;
            default:
                return <Icon name='genderless' />;
        }
    };

    return (
        <div>
            <div>
                <h1>{patient.name} {getGenderIcon()}</h1><br/>
                <span>ssn: {patient.ssn}</span><br/>
                <span>occupation: {patient.occupation}</span><br/><br/>
            </div>
            <div>
                <h3>entries</h3>
                <Item.Group>
                    {patient.entries.map(entry =>
                        <EntryDetails entry={entry} key={entry.id} />
                    )}
                </Item.Group>
            </div>
            <div>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry</Button>
            </div>
        </div>
    );
};

export default PatientSinglePage;
