require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(PORT,() => {
    console.log('Server is running on port 3000');
});

