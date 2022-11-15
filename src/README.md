# Instance MongoDB

Vous pouvez vous créer une instance gratuite de MongoDB sur MongoCloud (https://cloud.mongodb.com/)
ou instance locale sur votre machine.

Votre instance a besoin de seulement une base de données et une collection.

Vous n'avez qu'à modifier les 3 constantes dans le fichier "env.js" pour pouvoir vous connecter.

# Exécution du code

1. Assurez-vous de faire npm install ( ou npm ci avec le package-lock.json) pour installer le driver de NodeJS
2. Le script peut être lancé en faisant npm start  ou bien node db.js directement dans un terminal


La fonction main() contient les exemples d'appels à la BD. Vous pouvez les essayer dans l'ordre que vous voulez
Vous êtes encouragés de modifier le code fourni pour tester l'intéraction entre le driver votre instance MongoDB.

La méthode populateDB() permet de supprimer tous les éléments de votre collection et en ajouter quelques documents par défaut.