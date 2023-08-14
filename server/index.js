import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';

// Creating a express file > Routes - endpoint
const app = express();

// Serving static files: -> By using <express.static> : used for serve images
app.use(express.static('public'))
app.use('/images' , express.static("images"))

// Middleware setup 
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // CORS is a mechanism that allows browsers to request data from 3rd party URLs (or origins) 
dotenv.config();

mongoose.set('strictQuery', true); // deprecation warning issue resolved!

// connection established with db
mongoose.connect(
    process.env.MongoDB
    )
    .then(
        () => app.listen(process.env.PORT, () => console.log(`Connected with Database at ${process.env.PORT}`)
        ))
    .catch(
        (error) => console.log(error)
    )
  

// usage & setup of routes 
app.use('/auth', AuthRoute)

app.use('/user' , UserRoute)

app.use('/post' , PostRoute)

app.use('/upload' , UploadRoute)

app.use('/chat' , ChatRoute)

app.use('/message', MessageRoute)