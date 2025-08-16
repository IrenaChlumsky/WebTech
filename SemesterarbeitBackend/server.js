const express = require('express');
const routes = require('./routes');



const app = express();
app.use(express.json());
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server started and listening on port ${PORT} ...`);
});
