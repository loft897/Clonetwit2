const mongoose = require('mongoose');

const Schema = mongoose.Schema; // invoquer la fonction schema

const UserSchema = new Schema({ // definition un model de schema de publication

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true , unique: true},
    password: { type: String, required: true},
    profilePic: {type: String, default: "/images/profilePic.png"}
}, {timestamps : true});  // option pour ajouter l'heure et date de creation et publication sur chaque schema


const User = mongoose.model("User", UserSchema);

module.exports = User;

