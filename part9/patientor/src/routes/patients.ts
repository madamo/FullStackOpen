/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import express from 'express';
//import { Response } from 'express'
import patientService from '../services/patientService';
//import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

//TO-DO: Create endpoint to add patients
router.post('/', (req, res) => {
  console.log(req.body);
  const newPatient = req.body;

  res.send(newPatient);
});

export default router;