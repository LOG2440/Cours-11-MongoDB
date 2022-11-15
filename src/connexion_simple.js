const { MongoClient } = require("mongodb");
// TODO : fournir les bonnes informations de connexion (les <> doivent être enlevés)
const uri = "mongodb+srv://Admin:<password>@log2440cluster.fzyah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
  const collection = client.db("database").collection("classes");
  collection
    .find({})
    .toArray()
    .then((documents) => {
      console.log(documents);
      client.close();
    });
});
