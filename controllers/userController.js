import UserModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

// Other controller methods for user-related operations can be defined here

export const users = async (req, res) => {
    res.status(200).json({
        user: 'Jk'
    })
};