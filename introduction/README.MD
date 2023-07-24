# Introduction à MongoDB

Ce projet est un exemple minimaliste de connexion et lecture de données sur une instance MongoDB.

Le script dans [main.js](./main.js) ouvre une connexion vers votre instance (assurez-vous de mettre le bon URI de votre instance) MongoDB et la BD nommée `database`` qui contient une collection nommée `classes`. 

La collection est récupérée au complet et affichée dans la console.

Par la suite, la connexion avec l'instance est fermée et le script se termine.

Vous pouvez exécuter le script à l'aide de la commande `npm start`. N'oubliez pas d'installer les dépendances avec `npm ci` avant d'exécuter le script.

## Appels asynchrones

Notez que tous les appels vers la base de données sont asynchrones. Ceci est important puisqu'on ne veut pas bloquer le fonctionnement du serveur pendant qu'on attend une réponse de la base de données. Cette réponse peut prendre potentiellement beaucoup de temps et nuirait grandement à la performance du serveur.

L'exemple de code utilise un mélange de `Promise` et `async`/`await`. Les deux syntaxes sont supportés et plusieurs méthodes d'un objet `MongoClient` ou `Collection` retourne un objet `Promise`.

Consultez [l'autre exemple](../courses/) pour des exemples plus complets d'intéraction avec MongoDB.