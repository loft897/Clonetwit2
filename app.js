const http = require("http");
const fs = require("fs");
// const mongoose = require("mongoose");
const mongoose = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");

const displayContent = require("./routes");
const app = express();
const port = 3001;

const middleware = require("./middleware");
// mongoose.connect(
//     "mongodb+srv://slz987:Tatamebe123@twitterclonecluster.ufrex.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     console.log("Connexion à la DB reussie");
//   })
//   .catch((err) => {
//     console.log("Connexion à la DB echouée : " + err);
//   });

// const process = require('process');

// fs.writeFileSync("myText.txt", 'I want to eat sandiwitch')

// const server = http.createServer( displayContent);
// server.listen(3001);

const server = app.listen(port, () =>
  console.log("Server listenning on port " + port)
);

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {
  let payload = {
    pageTitle: "Accueil",
  };

  res.status(200).render("home", payload);
});
