const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Post = require("../../schemas/PostSchema");

app.use(bodyParser.urlencoded({ extended: false })); // configuration du parsing (analyse de corps)

router.get("/", (req, res, next) => {});

router.post("/", async (req, res, next) => {
  if (!req.body.content) {
    console.log("Requette de contenu non envoyée");
    return res.sendStatus(400);
  }

  let postData = {
    content: req.body.content,
    postedBy: req.session.user.Id
  };


  Post.create(postData) // creation de la publication dans le serveur
  .then( async newPost => {
          newPost = await User.populate(newPost, {path: "postedBy"});
          res.status(201).send(newPost)
  })
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  })

 // res.status(200).send("ça fonctionne!");
});

module.exports = router;
