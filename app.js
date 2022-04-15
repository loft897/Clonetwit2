const http = require("http");
// const fs = require("fs");
// const mongoose = require("mongoose");
const mongoose = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const path = require("path");
const session = require('express-session');

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

app.use(bodyParser.urlencoded({ extended: false })); // configuration du parsing (analyse de corps)
app.use(express.static(path.join(__dirname, "public"))); // config chemain dossier
app.use(session({   // config du hashage de session
    secret: "bbq chips", resave: true, saveUninitialized: false
}))

// routes

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/registerRoutes");
const logoutRoute = require("./routes/logoutRoutes");

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {  //  "/" est defini pour la page d'accueil "home"
  let payload = {
    pageTitle: "Accueil",
    userLoggedIn: req.session.user  // definition de la session de l'utilisateur connecté sur la home page
  };

  res.status(200).render("home", payload);
});
