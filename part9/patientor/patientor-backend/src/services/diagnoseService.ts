import diagnoseData from './../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoseData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};