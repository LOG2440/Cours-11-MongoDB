# Configuration d'instances MongoDB avec Cloud Atlas
 

1. Créez un compte pour MongoDB : https://www.mongodb.com/cloud/atlas
2. Cliquez sur le bouton **New Project** pour créer un nouveau projet
    
    1. Donnez un nom significatif à votre projet
    2. Rajoutez vos coéquipiers au projet (ceci est optionnel et peut être fait plus tard)

3. Cliquez sur le bouton **Build a Database** pour créer votre cluster de données

    1. Choisissez l'option gratuite **Shared**
    2. Choisissez votre fournisseur et région. L'option `AWS` en Virginie du Nord (`us-east-1`) par défaut est tout à fait suffisante, mais vous pouvez choisir `Google Cloud Platform` ou `Microsoft Azure`. Vous pouvez nommer votre grappe ou laisser le nom "Cluster0" par défaut.
    3. Le cluster prendra 5-10 minutes pour être fonctionnel. Vous serez avertis lorsque la création est terminée.

4. Configurez les paramètres de connexion

    1. Créez un utilisateur pour la base de données. Vous pouvez garder l'utilisateur Admin:admin par défaut. **NB** : n'oubliez pas de prendre en note le mot de passe configuré pour votre utilisateur.
    2. Ajoutez l'adresse **0.0.0.0** pour rendre l'instance accessible à toutes les machines.
    3. (Optionnel) Ajoutez votre adresse IP avec l'option `Add My Current IP Address` : ceci est valide seulement pour l'adresse IP que vous avez présentement.

5. Vous devrez être redirigés vers l'interface de votre nouvelle instance. Cliquez sur le bouton **Connect** pour obtenir l'URI de votre instance.
    
    1. Choisissez l'option **Connect your application** 
    2. Mettez `Node.js` comme DRIVER et `5.5 or later` comme `VERSION` si ce n'est pas déjà le cas.
    3. Prenez la chaîne de caractères générée pour vous connecter dans la section 2. Vous pouvez y accéder à tout moment en cliquant encore sur **Connect**.
        **NB**: N'oubliez pas de remplacer \<password\> par le mot de passe de l'utilisateur créé à l'étape 4.1 (les <> doivent être enlevées aussi)



## Création d'une collection :

1. Cliquez sur bouton **Browse Collections** de la grappe que vous avez créé.
2. Choisissez l'option **Add My Own Data**.
3. Entrez le nom de votre **database** et votre **collection** et cliquez sur **Create**.

    1. Vous pouvez créer d'autres collections en cliquant sur le bouton plus **+** à côté du nom de votre **database** que vous avez créé.
    2. Vous pouvez voir et éditer les documents faisant partie de vos collections directement à partir d'Atlas à travers l'onglet **Collections**.


# Pour aller plus loin :

L'exemple [suivant](https://gitlab.com/nikolayradoev/mongodb-example) est une évolution du projet dans cet entrepôt et est utilisé dans le cadre du cours **LOG2990**.

Ce projet combine un client MongoDB avec un serveur HTTP dynamique utilisant Express pour créer un service web. Ce service est accessible à travers une API REST. Cette API peut être accédée à travers une documentation Swagger qui offre une interface web pour les différentes requêtes HTTP. Pour plus de détails, consultez le [README](https://gitlab.com/nikolayradoev/mongodb-example#documentation-swagger-m%C3%A9thode-recommand%C3%A9e) du projet.