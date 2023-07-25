const { MongoClient } = require("mongodb");

// IMPORTANT : Assurez-vous d'avoir une instance de MongoDB configurée au préalable
// Consultez le fichier README à la racine

// Fournir les bonnes informations de connexion (les <> doivent être enlevés)
const uri = "mongodb+srv://Admin:password@log2440cluster.fzyah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const collection = client.db("database").collection("classes");
  collection.find({})
    .toArray().then((documents) => {
      console.log(documents);
      client.close();
    });
}
run();