import { Router } from 'express'

import {
  postComplex,
  postComplexFlat,
  postComplexBuilding
} from '../controllers/complex.controller.js'

const complexRoute = new Router();

// http://localhost:5000/api/complex
complexRoute.post('/', postComplex)

// http://localhost:5000/api/complex/building
complexRoute.post('/building', postComplexBuilding)

// http://localhost:5000/api/complex/building/flat
complexRoute.post('/building/flat', postComplexFlat)

export default complexRoute