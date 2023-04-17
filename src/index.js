const express=require("express");
const cors=require("cors");
const morgan=require('morgan');

const dev = require("./config");
const connectDB = require("./config/db");
const router = require("./routes/user");

const app=express();
const PORT=dev.app.serverPort;

app.use(morgan('dev'));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("test");
})

app.use('/api/users',router);

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
    connectDB();
})

