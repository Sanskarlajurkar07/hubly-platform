require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const connectDB = require('./src/config/database');

const resetPass = async () => {
    try {
        await connectDB();
        const email = 'sanskaradmin@hubly.com';
        const newPass = 'password123';

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        user.password = newPass;
        await user.save();

        console.log(`Password for ${email} reset to: ${newPass}`);
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

resetPass();
