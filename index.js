
const express = require("express");
const dotenv = require("dotenv");
const ejs = require("ejs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
let userIsAuthenticated = false;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req, res) => {
  res.render("login");
});

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

app.get("/dashboard", isAuthenticated, (req, res) => {
  userIsAuthenticated = false;
  res.render("login1");
});

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

server.listen(process.env.PORT, () => {
  console.log(`Server listening on Port ${process.env.PORT}`);
});
