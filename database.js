require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_APP,MONGODB_HOST } = process.env;
const URI = `mongodb://${MONGODB_HOST}/${MONGODB_APP}`
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('Database conect'))
.catch(err => console.log('ERRO  EN LA CONEXION'))