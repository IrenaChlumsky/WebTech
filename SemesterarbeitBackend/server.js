
const express   = require('express');
const routes    = require('./routes');
const mongoose  = require('mongoose');
require('dotenv').config();           

const app = express();

app.use(express.json());
app.use('/', routes);


mongoose.connect(process.env.MONGO_URI, { dbName: 'pokemon' });

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB-Fehler:', err);
});
db.once('open', () => {
  console.log('connected to DB');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server started and listening on port ${PORT} ...`);
});