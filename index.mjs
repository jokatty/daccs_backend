import express from 'express';

const app = express();
const PORT = 3004;

// set a home route
app.get('/', (req, res) => {
  res.send('welcome to dacss api');
});
// spin the server in port 3004
app.listen(PORT, () => {
  console.log(`listing to port:${PORT}`);
});
