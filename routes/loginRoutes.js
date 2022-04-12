const express = require("express");
const app = express();

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
    // let payload = {
    //     pageTitle: "Accueil"
    // }

    res.status(200).render('login');
})

module.exports = router;