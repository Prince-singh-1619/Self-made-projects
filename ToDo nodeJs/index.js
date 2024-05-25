const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
// ejs is accessed by default from 'views' folder named with 'index.ejs'
app.use(express.static("public"))

var task = ["Buy pencil", "Learn with node js"]
var complete = ["finish jquery"]

//post route for adding new task
app.post('/addtask', async(req, res) =>{
    var newTask = await req.body.newtask
    //add the newtask from post route to array
    task.push(newTask)
    //after adding to the array go to the root route
    res.redirect('/')
})

//render the ejs and display added task, 
// task(index.ejs) = task(array)

//the completed task array with initial placeholders for removed task
app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //check if the completed task already exist in the task when checked, then remove using the array splice method
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {     
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.get('/', async(req, res)=>{
    res.render('index', {task: task, complete: complete})
})

app.listen(3000, function(){
    console.log('Listening on port 3000')
})