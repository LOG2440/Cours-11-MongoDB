# Manipulation des données sur MongoDB

Ce projet est un exemple de lecture et manipulations des données sur une instance MongoDB. Le code se trouve dans le fichier [db.js](./src/db.js) et contient un ensemble de fonctions qui présentent différents cas de figures possibles avec la syntaxe du pilote (_driver_) de MongoDB pour NodeJS.

Vous pouvez exécuter le script à l'aide de la commande `npm start`. N'oubliez pas d'installer les dépendances avec `npm ci` avant d'exécuter le script.

Vous devez modifier les 3 constantes dans le fichier [env.js](./src/env.js) pour pouvoir vous connecter à votre instance MongoDB et la manipuler.

Les données traités dans l'exemple sont représentées par un objet `course` ayant le format suivant : 
```js
{ 
  sigle: string, 
  credits: number
}
```

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

## Serveur HTTP (API REST)

Le fichier [server.js](./src/server.js) expose les fonctions de `db.js` sous forme d'une API REST avec Express. Démarrez le serveur avec `npm start` (port 3000).

Pour exécuter uniquement les exemples de la ligne de commande sans le serveur : `npm run start:db`.

### Méthodes exposées

Voici les méthodes exposées par le serveur HTTP pour manipuler les données de la base de données :


| Méthode  | Chemin               | Description                                              | Paramètres                                                             | Codes de retour                                                              |
| -------- | -------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `GET`    | `/courses`           | Retourne tous les cours                                  | —                                                                      | `200` `course[]`                                                             |
| `GET`    | `/courses/names`     | Retourne uniquement les sigles (projection)              | —                                                                      | `200` `{ sigle: string }[]`                                                  |
| `GET`    | `/courses/sorted`    | Retourne les cours triés par crédits                     | `?ascending=true` (défaut) \| `false`                                  | `200` `course[]` trié                                                        |
| `GET`    | `/courses/first`     | Retourne les N premiers cours                            | `?limit=N` (défaut : 1)                                                | `200` `course[]`                                                             |
| `GET`    | `/courses/log`       | Retourne les cours LOG avec moins de N crédits           | `?maxCredits=N` (défaut : 4)                                           | `200` `course[]`                                                             |
| `GET`    | `/courses/:sigle`    | Retourne les cours correspondant au sigle                | —                                                                      | `200` `course[]` · `404` message d'erreur                                    |
| `POST`   | `/courses`           | Ajoute un cours — corps : `course`                       | —                                                                      | `201` `course` · `409` sigle déjà existant                                   |
| `PATCH`  | `/courses/:sigle`    | Modifie les crédits d'un cours — corps : `{ credits }`   | —                                                                      | `200` `{ sigle: string, credits: number }`                                   |
| `DELETE` | `/courses`           | Supprime tous les cours de la collection                 | —                                                                      | `200` message de confirmation                                                |
| `DELETE` | `/courses/:sigle`    | Supprime un ou plusieurs cours par sigle                 | `?deleteAll=false` (défaut) \| `true` pour supprimer tous les doublons | `200` `{ sigle: string }`                                                    |

> Tous les endpoints retournent `500` avec un message d'erreur en cas d'erreur serveur.