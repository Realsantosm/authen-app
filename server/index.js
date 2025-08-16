const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api", authRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(PORT,() => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

