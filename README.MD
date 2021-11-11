# Configuration d'instances MongoDB avec Cloud Atlas
 

1. Créez un compte pour mongoDB : https://www.mongodb.com/cloud/atlas
2. Cliquez sur le bouton "New Project" pour créer un nouveau projet
    
    2.1 Donnez un nom significatif à votre projet

3. Cliquez sur le bouton Build a Database pour créer votre cluster de données

    3.1 Choisissez l'option gratuite "Shared"

    3.2 Choisissez votre provider et région. L'option AWS en Virginie du Nord par défaut est tout à fait suffisante, mais vous pouvez choisir Google Cloud Platform ou Microsoft Azure. Vous pouvez nommer votre grappe ou laisser le nom "Cluster0" par défaut.

    3.3 Le cluster prendrera 5-10 minutes pour être fonctionnel. Vous serez avertis lorsque la création est terminée.

4. Cliquez sur le bouton **Connect** lorsque votre cluster est fonctionnel.

    4.1 Rendez votre instance accessible de partout à travers l'adresse IP **0.0.0.0/0** avec l'option **Allow Acess from Anywhere**. Attention à ne pas ajouter que votre adresse IP. Si c'est fait, vous pouvez le modifier par la suite dans le menu "Network Access" à la gauche de la page.

    4.2 Ajoutez un utilisateur pour la base de données. Vous pouvez garder l'utilisateur Admin:admin par défaut ou laisser Atlas vous générer un mot de passe aléatoire. La création est également disponible dans le menu "Database Access" à la gauche de la page.

    
    **Attention** : n'oubliez pas de sauvegarder ce mot de passe pour la suite avant de continuer.

    4.3 Choisissez l'option **Connect your application** pour la prochaine étape.

    4.4 Mettez **Node.js** comme DRIVER et **4.0 or later** comme VERSION.

    4.5 Prenez la chaîne de caractères générée pour vous connecter dans la section 2. Vous pouvez y accéder à tout moment en cliquant encore sur **CONNECT**. Notez bien les éléments à remplacer par les informations de l'utilisateur que vous avez créé à l'étape **4.2**.

    Vous avez aussi accès à un exemple très simple de comment se connecter dans l'onglet "Full Driver Exemple" **Important**: N'oubliez pas de remplacer \<password\> par le mot de passe de l'utilisateur ajouté en 4.2 (les <> doivent être enlevées aussi)


# Création d'une collection :

1. Cliquez sur bouton **Browse Collections** de la grappe que vous avez créé.
2. Choisissez l'option **Add My Own Data**.
3. Entrez le nom de votre **database** et votre **collection** et cliquez sur **Create**.

    3.1 Vous pouvez créer d'autres collections en cliquant sur le bouton 
vert plus **+** à côté du nom de votre **database** que vous avez créé.

    3.2 Vous pouvez voir et éditer les documents faisant partie de vos collections directement à partir d'Atlas à travers l'onglet **Collections**.
