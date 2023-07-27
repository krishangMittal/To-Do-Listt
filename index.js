import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));





let newItems = [];
let workItems = [];

app.get("/", (req, res) => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
let day = weekday[d.getDay()];
let date = day + ", " + month[d.getMonth()] + " " + d.getDate() ;

res.render("index.ejs", { 
  currentDate: date,
  newListItem: newItems // Use the global variable here
});
});

app.get("/work", (req, res) => {
  res.render("work.ejs" ,{ 
    newListItem: workItems // Pass the same array to the work template
  });
});


app.post("/work", (req, res) => {
  let newItem = req.body.newItem; // Update the global variable
  workItems.push(newItem);
  res.redirect("/work");
});


app.post("/", (req, res) => {
  let newItem = req.body.newItem; // Update the global variable
  newItems.push(newItem);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


