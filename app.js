// Call of our libraries
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://fx:sejjyw-rerxY4-votvox@cluster0-pfqk4.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
    extended: true
}));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, {
        useNewUrlParser: true
    }, (error, client) => {
        if (error) {
            throw error;
        };
        database = client.db(DATABASE_NAME);
        collection = database.collection("people");
        console.log("Connected to " + DATABASE_NAME + " !");
    });
});

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error){
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

