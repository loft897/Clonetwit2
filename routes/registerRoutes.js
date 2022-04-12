const bodyParser = require('body-parser')
const express = require("express");
const app = express();

const router = express.Router();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    
    res.status(200).render('register');
})

// router.post("/", (req, res, next) => {

//     // console.log(req.body);

//     res.status(200).render('register');
// })


router.post("/", (req, res, next) => {

    let firstName = req.body.firstName.trim(); 
    let lastName= req.body.lastName.trim();
    let username = req.body.username.trim();
    let email= req.body.email.trim();
    let password = req.body.password.trim();
    
    let payload = req.body;
    
    if(firstName && lastName && username && email && password){
        res.status(200).render('register');
        
    }
    else{
        payload.errorMessage = 'Rassurez-vous que toutes les valeurs des champs sont bonnes!'
        res.status(200).render('register', payload);
    }
    
})

module.exports = router;