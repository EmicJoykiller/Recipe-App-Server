// important app library imports
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
//importing routers
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';



// express creation
const app = express();

// server middleware
app.use(express.json());
app.use(cors());

//importing userRouter file for server to use and where to use
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);



//MongoDB connection



// actually calling and running server
app.listen(3001, () => console.log("Server Started"));