import express from 'express';
import mongoose from 'mongoose';
import dotnet from 'dotenv';

import apartmentsRoute from './routes/apartment.route.js';
import complexRoute from './routes/complex.route.js';

import recipientAndSenler from './front/index.js'


const app = express();
dotnet.config();

// VARIABLES //
const PORT = process.env.PORT || 5001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// MIDELWARE //
app.use(express.json())


// ROUTES //
app.use('/api/apatments', apartmentsRoute)
app.use('/api/complex', complexRoute)

// CONNECT TO DB //
async function connectToDB() {
  try{
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.a3kzyol.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    )
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch(err) {
    console.log(err);
  }
}

connectToDB();


// RECIPIENT AND SENLER //
setTimeout(() => {
  recipientAndSenler();
}, 10000) // Для того, чтобы сначала запускался сервер, а затем уже отправка на него 