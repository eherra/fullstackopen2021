import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";

import { Patient, DiagnoseEntry } from "./types";

import PatientListPage from "./PatientListPage";
import PatientSinglePage from "./PatientSinglePage";


const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`/ping`);

    const fetchPatientAndDiagnoseList = async () => {
      try {
        const {data: patientListFromApi} = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const {data: diagnosisListFromApi} = await axios.get<DiagnoseEntry[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientAndDiagnoseList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
          <Route path="/patients/:id">
              <PatientSinglePage />
          </Route>
          <Route path="/">
            <PatientListPage />
          </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
