import express from 'express';
//import { Response } from 'express'
import patientService from '../services/patientService';
//import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;