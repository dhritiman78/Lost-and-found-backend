require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Failed to connect ,', error)
        process.exit()
    }
}

module.exports = connectDB