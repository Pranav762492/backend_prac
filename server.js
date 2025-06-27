const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const imageGenRouter = require('./routes/routes_ig');
app.use('/api', imageGenRouter);

app.get('/', (req, res) => {
  res.send('Image Generation API is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
