const mongoose = require('mongoose');

const Schema = mongoose.Schema; // invoquer la fonction Schema

const PostSchema = new Schema({ // definition un model de schema de publication

    content: { type: String, trim: true },
    postedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    pinned: Boolean
}, {timestamps : true});  // option pour ajouter l'heure et date de creation et publication sur chaque schema


let Post = mongoose.model("Post", PostSchema); 

module.exports = Post;