const express = require("express");
const db = require("./db");

const app = express();
const router = express.Router();
const PORT = 3000;

app.use(express.json());
app.use("/courses", router);

// GET /courses — retourne tous les cours
router.get("/", async (req, res) => {
  try {
    const courses = await db.getAllCourses();
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /courses/names — retourne uniquement les sigles (projection)
router.get("/names", async (req, res) => {
  try {
    const names = await db.getNamesOnly();
    res.json(names);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /courses/sorted?ascending=true — retourne les cours triés par crédits
router.get("/sorted", async (req, res) => {
  try {
    const ascending = req.query.ascending !== "false"; // true par défaut
    const courses = await db.getSortedCourses(ascending);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /courses/first?limit=2 — retourne les N premiers cours
router.get("/first", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1;
    const courses = await db.getFirstNCourses(limit);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /courses/log?maxCredits=4 — retourne les cours LOG avec moins de N crédits
router.get("/log", async (req, res) => {
  try {
    const maxCredits = parseInt(req.query.maxCredits) || 4;
    const courses = await db.getLOGCoursesLessCredits(maxCredits);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /courses/:sigle — retourne les cours correspondant au sigle
router.get("/:sigle", async (req, res) => {
  try {
    const courses = await db.getCoursesBySigle(req.params.sigle);
    if (courses.length === 0) {
      return res.status(404).json({ error: `Aucun cours trouvé pour le sigle : ${req.params.sigle}` });
    }
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /courses — ajoute un cours
// Corps : { sigle, credits, responsable }
router.post("/", async (req, res) => {
  try {
    const course = req.body;
    await db.addCourse(course);
    res.status(201).json(course);
  } catch (e) {
    if (e.code === 11000) { // Erreur de clé dupliquée de MongoDB
      return res.status(409).json({ error: `Un cours avec le sigle "${req.body.sigle}" existe déjà` });
    }
    res.status(500).json({ error: e.message });
  }
});

// PATCH /courses/:sigle — modifie les crédits d'un cours
// Corps : { credits }
router.patch("/:sigle", async (req, res) => {
  try {
    const { credits } = req.body;
    await db.modifyCourse(req.params.sigle, credits);
    res.json({ sigle: req.params.sigle, credits });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /courses — supprime tous les cours de la collection
router.delete("/", async (req, res) => {
  try {
    await db.deleteAll();
    res.json({ message: "Tous les cours ont été supprimés" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /courses/:sigle?deleteAll=true — supprime un ou plusieurs cours par sigle
router.delete("/:sigle", async (req, res) => {
  try {
    const deleteAll = req.query.deleteAll === "true";
    await db.deleteCourse(req.params.sigle, deleteAll);
    res.json({ sigle: req.params.sigle });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
