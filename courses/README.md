# Manipulation des données sur MongoDB

Ce projet est un exemple de lecture et manipulations des données sur une instance MongoDB. Le code se trouve dans le fichier [db.js](./src/db.js) et contient un ensemble de fonctions qui présentent différents cas de figures possibles avec la syntaxe du pilote (_driver_) de MongoDB pour NodeJS.

Vous pouvez exécuter le script à l'aide de la commande `npm start`. N'oubliez pas d'installer les dépendances avec `npm ci` avant d'exécuter le script.

Vous devez modifier les 3 constantes dans le fichier [env.js](./src/env.js) pour pouvoir vous connecter à votre instance MongoDB et la manipuler.

## Exécution du code

La fonction `main()` contient les exemples d'appels à la base de données. Vous pouvez les essayer dans l'ordre que vous voulez. 

## Obtenir des documents

La fonction `getCoursesExample()` contient un ensemble d'appels à MongoDB qui ne font que récupérer des données de la collection. Les données sont accédées complétement, ou partiellement avec des modificateurs tels que des filtres de recherche (simples ou composés) et des tris. Par exemple, le code suivant permet d'obtenir tous les documents dont l'attribut `sigle` commence par `LOG` et dont l'attribut `credits` est plus petit que `4`:
```js
const courses = await collection.find({
  $and: [
    { sigle: /^LOG/ },
      { credits: { $lt: maxCredits } }
  ]
}).toArray();
```
La fonction `getCoursesProjectionExample()` présente un exemple d'utilisation d'une projection. MongoDB permet de récupérer des parties d'un document à l'aide d'une projection. La projection permet d'inclure ou exclure (mais pas les 2 en même temps) certains champs des documents dans une collection.

## Manipuler des documents

La fonction `addNewCourseExample()` présente un exemple d'ajout d'un nouveau document dans la collection. À noter que le document ajouté a un champ supplémentaire. MongoDB permet des documents avec des schémas différents dans la même collection.

La fonction `modifyCourseExample()` présente un exemple de modification d'un document en utilisant l'opérateur propre à MongoDB `$set`.

La fonction `deleteCourseExample()` présente un exemple de suppression d'un ou plusieurs documents dans une collection.

Vous êtes encouragés de modifier le code fourni pour tester l'intéraction entre le driver votre instance MongoDB.

La méthode `populateDB()` permet de supprimer tous les éléments de votre collection et en ajouter quelques documents par défaut. Cette méthode est exécutée au début de la majorité des méthodes appelées dans `main()` pour s'assurer que l'état initial de la collection est toujours le même.