const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

const addMember = async () => {
    const args = process.argv.slice(2);
    if (args.length < 4) {
        console.log('Usage: node addTeamMember.js <name> <email> <password> <phone>');
        process.exit(1);
    }

    const [name, email, password, phone] = args;

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hubly-crm', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists');
            process.exit(1);
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: 'team_member',
        });

        console.log('Team Member Added:');
        console.log(user);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

addMember();
