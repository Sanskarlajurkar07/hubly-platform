const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hubly-crm', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const admin = await User.findOne({ role: 'admin' });
        if (admin) {
            console.log('Admin found:');
            console.log('Name:', admin.name);
            console.log('Email:', admin.email);
            console.log('ID:', admin._id);
        } else {
            console.log('No admin found.');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkAdmin();
