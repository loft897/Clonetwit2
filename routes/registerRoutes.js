const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema')
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));   // controle du corps 

router.get("/", (req, res, next) => {
    
    res.status(200).render('register');
})

// router.post("/", (req, res, next) => {

//     // console.log(req.body);

//     res.status(200).render('register');
// })


router.post("/", async (req, res, next) => {

    let firstName = req.body.firstName.trim(); 
    let lastName= req.body.lastName.trim();
    let username = req.body.username.trim();
    let email= req.body.email.trim();
    let password = req.body.password.trim();
    
    let payload = req.body;
    
    if(firstName && lastName && username && email && password){ // verification si les champs sont vides 
        // res.status(200).render('register');
        const user = await User.findOne({ // rechercher si l'email ou le nom du user deja presents dans la BD
            $or: [
                {username: username},
                {email: email}
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = 'Quelque chose ne va pas : ' + error
            res.status(200).render('register', payload);
        });

        if(user == null){
            // pas d'utilisateur trouvé

            let data = req.body;

            data.password = await bcrypt.hash(password, 10)  // hashage du mot de passe avec bcrypt

            User.create(data)  // creation utilisateur 
            .then((user) => {
                req.session.user = user;
                return res.redirect("/");  // retour page d'accueil
            })
        }
        else {
            // utilisateur trouvé
            if(email == user.email){
                payload.errorMessage = 'Email deja utilsé';
            }
            else {
                payload.errorMessage = "Nom d'utilisateur deja utilsé";
            }
            res.status(200).render('register', payload);
        }
        
        // res.status(200).render('register', payload);
    }
    else{
        payload.errorMessage = 'Rassurez-vous que toutes les valeurs des champs sont bonnes!'
        res.status(200).render('register', payload);
    }
    
})

module.exports = router;