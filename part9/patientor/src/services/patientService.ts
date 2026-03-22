import patients from '../data/patients';
import { NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
  return patients;
};

export default {
  getPatients
};
