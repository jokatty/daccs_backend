import express from 'express';

const app = express();
const PORT = 3004;

// set a home route
app.get('/', (req, res) => {
  const userInformation = {
    name: 'Justus Darley',
    bankAc: 'NL67 000 111',
    email: 'jd@example.com',
    phone: '01234567',
  };
  console.log(userInformation);
  res.send(userInformation);
});
// spin the server in port 3004
app.listen(PORT, () => {
  console.log(`listing to port:${PORT}`);
});
