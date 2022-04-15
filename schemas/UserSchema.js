const mongoose = require('mongoose');

const Schema = mongoose.Schema; // invoquer la fonction schema

const UserSchema = new Schema({ // creer un model de schema

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true , unique: true},
    password: { type: String, required: true},
    profilePic: {type: String, default: "/images/profilePic.png"}
}, {timestamps : true});


const User = mongoose.model("User", UserSchema); // creer un model mongoose

module.exports = User;


// mongoose
//   .connect("mongodb://alex:papa@localhost:27017/lds", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connexion : OK !");

//     // const newChapter = new Chapitres({   // Creation d'un document dans une collection
//     //   title: "Flutter",
//     //   nbroflessons: 21,
//     //   index: 4,
//     //   active: true,
//     // });

//     // newChapter.save((err, document) => {
//     //   console.log(document);
//     // });
//     Chapitres.find({}, (err, documents) => {
//         console.log(documents)
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   }); 