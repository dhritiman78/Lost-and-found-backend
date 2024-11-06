const bcrypt = require('bcrypt');
const User = require('../models/users');
const saltRounds = 10;

const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if (!firstname || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    const hashed_password = await bcrypt.hash(password, saltRounds)
    const newUser = {
        name: firstname+" "+lastname,
        email,
        password: hashed_password
    }

    try {
        const user_registration = User.create(newUser)
        if(!!user_registration)
            return res.status(201).send({message: "Successfully registered!", newUser})
        return res.status(500).send({message: "Registration failed!"})
    } catch (error) {
        return res.status(500).send({message: "Internal server error!"})
    }
}

module.exports = {
    register
}