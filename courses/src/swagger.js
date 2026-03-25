const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion des cours (MongoDB)",
      version: "1.0.0",
      description: "API REST pour gérer des cours stockés dans MongoDB. Permet d'effectuer des opérations CRUD ainsi que des recherches et tris.",
    },
    tags: [
      { name: "GET",    description: "Récupérer des cours" },
      { name: "POST",   description: "Ajouter un cours" },
      { name: "PATCH",  description: "Modifier un cours" },
      { name: "DELETE", description: "Supprimer des cours" },
      { name: "ADMIN",  description: "Réinitialiser les données" },
    ],
    components: {
      schemas: {
        Cours: {
          type: "object",
          properties: {
            sigle:   { type: "string",  example: "LOG2440" },
            credits: { type: "integer", example: 3 },
          },
        },
      },
    },
  },
  apis: ["./src/swagger.js"],
};

module.exports = swaggerJSDoc(swaggerOptions);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupérer la liste de tous les cours
 *     tags:
 *       - GET
 *     responses:
 *       200:
 *         description: "Liste de tous les cours"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *             example:
 *               - _id: "64b8f1c2e1d3f2a5b6c7d8e9"
 *                 sigle: "LOG2440"
 *                 credits: 3
 *               - _id: "64b8f1c2e1d3f2a5b6c7d8ea"
 *                 sigle: "LOG4420"
 *                 credits: 3
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/names:
 *   get:
 *     summary: Récupérer uniquement les sigles des cours (projection)
 *     tags:
 *       - GET
 *     responses:
 *       200:
 *         description: "Liste des sigles"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sigle:
 *                     type: string
 *             example:
 *               - sigle: "LOG2440"
 *               - sigle: "LOG4420"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/sorted:
 *   get:
 *     summary: Récupérer les cours triés par nombre de crédits
 *     tags:
 *       - GET
 *     parameters:
 *       - in: query
 *         name: ascending
 *         schema:
 *           type: boolean
 *           default: true
 *         description: "Tri croissant si true (défaut), décroissant si false"
 *         example: true
 *     responses:
 *       200:
 *         description: "Liste des cours triés par crédits"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/first:
 *   get:
 *     summary: Récupérer les N premiers cours de la collection
 *     tags:
 *       - GET
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Nombre de cours à retourner (défaut : 1)"
 *         example: 2
 *     responses:
 *       200:
 *         description: "Les N premiers cours"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/log:
 *   get:
 *     summary: Récupérer les cours LOG avec moins de N crédits
 *     tags:
 *       - GET
 *     parameters:
 *       - in: query
 *         name: maxCredits
 *         schema:
 *           type: integer
 *           default: 4
 *         description: "Nombre maximum de crédits (exclusif). Défaut : 4"
 *         example: 4
 *     responses:
 *       200:
 *         description: "Cours dont le sigle commence par LOG et avec moins de maxCredits crédits"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/{sigle}:
 *   get:
 *     summary: Récupérer les cours par sigle
 *     tags:
 *       - GET
 *     parameters:
 *       - in: path
 *         name: sigle
 *         required: true
 *         schema:
 *           type: string
 *         description: "Le sigle du cours à récupérer"
 *         example: LOG2440
 *     responses:
 *       200:
 *         description: "Cours trouvés pour ce sigle"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cours'
 *             example:
 *               - sigle: "LOG2440"
 *                 credits: 3
 *       404:
 *         description: "Aucun cours trouvé pour ce sigle"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Ajouter un nouveau cours
 *     tags:
 *       - POST
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cours'
 *           example:
 *             sigle: "LOG2995"
 *             credits: 3
 *     responses:
 *       201:
 *         description: "Cours ajouté avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cours'
 *       400:
 *         description: "Requête invalide (ex: sigle ou crédits manquants)"
 *       409:
 *         description: "Un cours avec ce sigle existe déjà"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/{sigle}:
 *   patch:
 *     summary: Modifier le nombre de crédits d'un cours
 *     tags:
 *       - PATCH
 *     parameters:
 *       - in: path
 *         name: sigle
 *         required: true
 *         schema:
 *           type: string
 *         description: "Le sigle du cours à modifier"
 *         example: LOG2440
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credits:
 *                 type: integer
 *             required:
 *               - credits
 *           example:
 *             credits: 4
 *     responses:
 *       200:
 *         description: "Cours modifié avec succès"
 *         content:
 *           application/json:
 *             example:
 *               sigle: "LOG2440"
 *               credits: 4
 *       404:
 *         description: "Aucun cours trouvé pour ce sigle"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses:
 *   delete:
 *     summary: Supprimer tous les cours de la collection
 *     tags:
 *       - DELETE
 *     responses:
 *       200:
 *         description: "Tous les cours ont été supprimés"
 *         content:
 *           application/json:
 *             example:
 *               message: "Tous les cours ont été supprimés"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/{sigle}:
 *   delete:
 *     summary: Supprimer un ou plusieurs cours par sigle
 *     tags:
 *       - DELETE
 *     parameters:
 *       - in: path
 *         name: sigle
 *         required: true
 *         schema:
 *           type: string
 *         description: "Le sigle du cours à supprimer"
 *         example: LOG2440
 *       - in: query
 *         name: deleteAll
 *         schema:
 *           type: boolean
 *           default: false
 *         description: "Si true, supprime tous les documents avec ce sigle; sinon supprime uniquement le premier"
 *     responses:
 *       200:
 *         description: "Cours supprimé avec succès"
 *         content:
 *           application/json:
 *             example:
 *               sigle: "LOG2440"
 *       404:
 *         description: "Aucun cours trouvé pour ce sigle"
 *       500:
 *         description: "Erreur interne du serveur"
 */

/**
 * @swagger
 * /courses/admin/reset:
 *   delete:
 *     summary: Vider la collection et la repeupler avec 3 cours par défaut
 *     tags:
 *       - ADMIN
 *     responses:
 *       200:
 *         description: "Collection réinitialisée avec succès"
 *         content:
 *           application/json:
 *             example:
 *               message: "Collection réinitialisée avec 3 cours"
 *       500:
 *         description: "Erreur interne du serveur"
 */
