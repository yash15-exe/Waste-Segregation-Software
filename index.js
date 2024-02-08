import express from "express";
import dotenv from "dotenv";
dotenv.config();



const app = express();
app.use(express.json());
let userIsAuthenticated = false;



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
  res.send("Welcome to your dashboard!");
});



app.get("/login", (req, res) => {
  const { password } = req.body;
  console.log(password);
  let loginSuccessful = false;
  console.log(process.env.PASSWORD);
  if (password === process.env.PASSWORD) {
    userIsAuthenticated = true;

    loginSuccessful = true;
  }
  if (loginSuccessful) {
    userIsAuthenticated = true;
    res.redirect("/dashboard");
  } else {

    res.send("Login failed. Try again.");
  }
});




app.listen(process.env.PORT, () => {
  console.log(`Server listening on Port ${process.env.PORT}`);
});
