const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../schemas/UserSchema')

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false })); // configuration du parsing (analyse de corps)

router.get("/", (req, res, next) => {

    res.status(200).render('login');
})


router.post("/", async (req, res, next) => {

    let payload = req.body;

    if(req.body.logUsername && req.body.logPassword){
        const user = await User.findOne({ // rechercher si l'email ou le nom du user deja presents dans la BD
            $or: [
                {username: req.body.logUsername},
                {email: req.body.logUsername}
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Quelque chose n'a pas fonctionné"
            res.status(200).render('login', payload);
        });

        if(user != null){
            const result = await bcrypt.compare(req.body.logPassword, user.password)

            if(result === true){
                req.session.user = user;
                return res.redirect("/");
            }
        }

        payload.errorMessage = "Les identifiants de connexion sont incorrects." 
        return res.status(200).render('login', payload);

    }

    // payload.errorMessage = "Identifiants de connexion incorrects." 
    res.status(200).render('login');
})

module.exports = router;