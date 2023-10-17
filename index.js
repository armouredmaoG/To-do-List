import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
var currActiveBtn;
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"];
var fullDate = new Date();

//show the daily task when page loads for first time
app.get("/", async (req, res)=>{
    res.render("index.ejs", {activeButton: "daily",tasks: todayTask});
});

//show the daily task when H active button is "daily"
app.get("/daily", (req, res)=>{
    res.render("index.ejs", {activeButton: "daily",tasks: todayTask});;
});

//show the work task when current active button is "work"
app.get("/work", (req, res)=>{ 
    res.render("index.ejs",{activeButton: "work",tasks: workTask});
});


//push the new task to array and show the updated array 
app.post("/addTask", (req, res)=>{

    var newTaskToAdd = req.body.taskName;
    currActiveBtn = req.body.activeBtn;

    if(currActiveBtn === "daily"){
        todayTask.push(newTaskToAdd);
        res.redirect("/");
    }else if(currActiveBtn === "work"){
        workTask.push(newTaskToAdd);
        res.render("index.ejs", {tasks: workTask});
    }

});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});


var todayTask = [];
var workTask = [];
