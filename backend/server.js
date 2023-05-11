// Bring In Dependencies
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleWare");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;

connectDB();
const app = express();

// let splitText = "Bearer Token Ends Here";
// console.log(splitText.split(" ")[0]);
//Adding MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Specifing routes, and which file it should be routed to
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Overriding The Default error handler
app.use(errorHandler);

app.listen(PORT, () => console.log("server has started on port", PORT));
