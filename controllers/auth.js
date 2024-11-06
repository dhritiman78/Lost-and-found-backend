const bcrypt = require('bcrypt');
const User = require('../models/users');
const { generateAccessToken } = require('../utils/jwt');
const saltRounds = 10;

const testAPI = (req, res) => {
    const { firstName, lastName, email, password } = req.body
    return res.status(200).json({details: {firstName, lastName, email, password} ,message: "API is working!"})
}

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const hashed_password = await bcrypt.hash(password, saltRounds)
    const newUser = {
        name: firstName+" "+lastName,
        email,
        password: hashed_password
    }


    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ msg: 'User already exists' })
            
        }
        const user_registration = User.create(newUser)
        if(!!user_registration)
            return res.status(201).send({message: "Successfully registered!"})
        return res.status(500).send({message: "Registration failed!"})
    } catch (error) {
        return res.status(500).send({message: "Internal server error!"})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateAccessToken(user._id); // Only pass the user ID
        return res.status(200).json({
            message: "Successfully logged in!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

module.exports = {
    register,
    login,
    testAPI
}