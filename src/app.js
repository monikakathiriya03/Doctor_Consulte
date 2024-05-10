require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const morgan = require("morgan");
// const path = require("path");

app.use(express.json());
app.use(morgan('dev'));

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes)

app.listen(port,() => {
    async function main() {
        await mongoose.connect(process.env.MONGO_DB_URL);
      }
      main()
        .then(() => console.log("DB is Connected...✔️"))
        .catch((err) => console.log(err.message));
    
      console.log(`Server start at http://localhost:${port}`);
    });
    