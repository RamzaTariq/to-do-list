const express = require("express");
const cors = require("cors");
const app - express();

app.use(cors());
app.use(express.json());

let task = [];

//GET all tasks
app.get("/tasks",(req, res) =>{
    res.json(tasks);
});