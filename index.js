const express = require('express')
const connectDB = require('./utils/db')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/auth')

app.use(express.json());

// Tackling the CORS
app.use(cors({
    origin: '*', // Update this to match your actual frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Handling preflight requests
app.options('/api/contact', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});

connectDB()

app.get('/',(req, res)=>{
    res.status(200).send("Welcome to lost and found!")
})

app.use('/api/auth', authRoutes)

app.listen(3000,()=>{
    console.log("listenting on port 3000")
})