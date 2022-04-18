const mongoose = require('mongoose');
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);

class Databse {
    
    constructor() {
        this.connect();
    }

    connect(){

        mongoose.connect(
            "mongodb+srv://user:password@twitterclonecluster.ufrex.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority"
          )
          .then(() => {
            console.log("Connexion à la DB reussie");
          })
          .catch((err) => {
            console.log("Connexion à la DB echouée : " + err);
          });
    }
}

module.exports = new Databse();