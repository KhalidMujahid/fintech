require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routes/user.route");
const transactionRoter = require("./routes/transaction.route");
const { connectDB } = require("./configs/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
});

app.use(limiter);

app.use("/api/",userRouter);
app.use("/api/", transactionRoter);

app.use((req,res,next) => {
    return res.status(404).json({ message: "Route not found" });
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port... ${PORT}`);
});
