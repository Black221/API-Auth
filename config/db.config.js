const { MongoClient } = require('mongodb');
const {mongoose} = require('mongoose');

const uri = "mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASS+"@guapicluster.z5rby.mongodb.net/"+process.env.DB_NAME;
const uri_local = "mongodb://localhost:27017/test_"+process.env.DB_NAME;
let connected = false;

let localConnect = function () {
    // DB connection
    mongoose.connect('mongodb://localhost:27017/'+process.env.DB_NAME)
        .then( () => console.log('Connected to MDB'))
        .catch(error => () => console.log('Connected error'));
}


//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     if (!err) {
//         connected = true;
//         console.log("Connected to MongoDB");
//     } else {
//         console.log("Error to connect on MongoDB: ", err);
//         console.log("Trying to connect on local db ....");
//
//         localConnect();
//     }
//     // perform actions on the collection object
// });

localConnect();