const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const router = require("./router");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => res.redirect("/api"));
app.use("/courses", router);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
