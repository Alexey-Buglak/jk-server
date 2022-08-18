import { Router } from "express";

import { postApartments } from '../controllers/apartments.controller.js'

const apartmentsRoute = new Router();

// http://localhost:5000/api/apatments/flat
apartmentsRoute.post('/flat', postApartments)

export default apartmentsRoute