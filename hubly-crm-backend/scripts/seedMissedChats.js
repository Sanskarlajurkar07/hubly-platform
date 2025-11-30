const mongoose = require('mongoose');
const MissedChat = require('../src/models/MissedChat');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Mock data for 10 weeks of missed chats
const missedChatsData = [
    { week: 'Week 1', chats: 13 },
    { week: 'Week 2', chats: 8 },
    { week: 'Week 3', chats: 14 },
    { week: 'Week 4', chats: 9 },
    { week: 'Week 5', chats: 6 },
    { week: 'Week 6', chats: 12 },
    { week: 'Week 7', chats: 4 },
    { week: 'Week 8', chats: 9 },
    { week: 'Week 9', chats: 16 },
    { week: 'Week 10', chats: 18 },
];

const seedMissedChats = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding...');

        // Clear existing missed chats data
        await MissedChat.deleteMany({});
        console.log('Cleared existing missed chats data');

        // Insert mock data
        await MissedChat.insertMany(missedChatsData);
        console.log('Successfully seeded 10 weeks of missed chats data');

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding missed chats:', error);
        process.exit(1);
    }
};

seedMissedChats();
