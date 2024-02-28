const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);
const mongoose = require("mongoose");
const Waste = require("./Model/wasteModel");
const idGen = require("./utilities/idGenerator");
const mailBuddy = require("./utilities/mailBuddy");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let userIsAuthenticated = false;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017")
  .then(console.log("Db connected succesfully"))
  .catch("Something went wrong in Db connection");

app.get("/login", (req, res) => {
  res.render("login");
});
//Middleware to stop direct routing and ensure security/////////////////////////////////////////////////////
const isAuthenticated = (req, res, next) => {
  const { password } = req.body;
  if (password === process.env.PASSWORD) {
    userIsAuthenticated = true;
  }

  if (userIsAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
};

//User Routes///////////////////////////////////////////////////////////////////////////////

app.get("/dashboard", isAuthenticated, (req, res) => {
  userIsAuthenticated = false;
  res.render("dashboard");
});

app.get("/simulation", (req, res) => {
  res.render("simulation");
});

app.get("/all", (req, res) => {
  res.render("all");
});

app.get("/graphsimu", (req, res) => {
  res.render("graphsimu");
});

app.get("/proportion", (req, res) => {
  res.render("proportion");
});

app.get("/organic", (req, res) => {
  res.render("organic");
});
app.get("/metal", (req, res) => {
  res.render("metal");
});

app.get("/paper", (req, res) => {
  res.render("paper");
});

app.get("/plastic", (req, res) => {
  res.render("plastic");
});
app.get("/glass", (req, res) => {
  res.render("glass");
});
app.get("/ewaste", (req, res) => {
  res.render("ewaste");
});

//Login Route/////////////////////////////////////////////////////////////////////////////////////////

app.post("/login", (req, res) => {
  const { password } = req.body;
  let loginSuccessful = false;
  if (password === process.env.PASSWORD) {
    userIsAuthenticated = true;

    loginSuccessful = true;
  }
  if (loginSuccessful) {
    userIsAuthenticated = true;
    res.status(200).json({ success: true, message: "Login successful" });
  } else {
    res.status(401).send("Login failed. Try again.");
  }
});
// Data sending mechanism
app.post("/data", (req, res) => {
  const request = req.body;
  const type = request.type;
  Waste.countDocuments({ type: type }).then((count) => {
    res.json({
      count: count,
      capacity: 100,
    });
  });
});


//Email Sending Mechanism//////////////////////////////////////////////////////////////////////////////
mailBuddy(process.env.RECEIVER_EMAIL);
app.post("/addWaste", (req, res) => {
  const request = req.body;

  const type = request.type;
  const id = idGen(10);
  const waste = Waste.create({
    id: id,
    type: `${type}`,
  });
  res.send(id);
});

//Activating the server//////////////////////////////////////////////////////////////////////////////////

server.listen(process.env.PORT||5000, () => {
  console.log(`Server listening on Port ${process.env.PORT||5000}`);
});
