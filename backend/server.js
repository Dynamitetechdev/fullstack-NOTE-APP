const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.PORT;
const { errorHandler } = require("./middleware/errorMiddleWare");
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/notes", require("./router/noteRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`${port}`));
