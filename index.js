import express from 'express';
import request from 'request'
import mongoose from 'mongoose';
import dotnet from 'dotenv';

// почистить пакеты от лишних баблиотек\пакетов

import apartmentsRoute from './routes/apartment.route.js';
import complexRoute from './routes/complex.route.js';

import recipientAndSenler from './front/index.js'
import parser from './front/components/parser.js';


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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.get('/proxy/apartments', (req, res) => {
  request(
    {
      url: 'https://realtyprotech.com/xml/84d6f6aa68698c0f8f199710fa9c84b7/cian/'
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message })
      }
      const apartmentsData = parser(body)
      res.send(apartmentsData)
    }
  )
})
app.get('/proxy/complex', (req, res) => {
  request(
    {
      url: 'https://realtyprotech.com/xml/84d6f6aa68698c0f8f199710fa9c84b7/domclick/'
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message })
      }
      const complexData = parser(body)
      res.send(complexData)
    }
  )
})

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