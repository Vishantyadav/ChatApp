const express = require('express');
const { chats } = require('./data/data');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes')
const {notFound, errorHandler}  = require('./Middlewares/errorMiddleware')
const colors = require('colors')
dotenv.config();
connectDB();
const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("API is running")
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server started at ${port}`.green.bold))