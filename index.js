const express = require('express')
const connectDB = require('./utils/db')
const app = express()
const authRoutes = require('./routes/auth')

app.use(express.json());

connectDB()

app.get('/',(req, res)=>{
    res.status(200).send("Welcome to lost and found!")
})

app.use('/api/auth', authRoutes)

app.listen(3000,()=>{
    console.log("listenting on port 3000")
})