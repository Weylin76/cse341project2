const dotenv = require('dotenv');
dotenv.config();

console.log('MongoDB URI:', process.env.MONGO_URI);  // Log the URI to confirm it’s loaded

module.exports = {
    url: process.env.MONGO_URI,
};


