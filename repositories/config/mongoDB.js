const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const URL = process.env.MONGO_URL;

// Configura la opción strictQuery antes de conectar con la base de datos
mongoose.set('strictQuery', false);

const connection = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;
