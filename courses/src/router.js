const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await db.getAllCourses();
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/names", async (req, res) => {
  try {
    const names = await db.getNamesOnly();
    res.json(names);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/sorted", async (req, res) => {
  try {
    const ascending = req.query.ascending !== "false"; // true par défaut
    const courses = await db.getSortedCourses(ascending);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/first", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1;
    const courses = await db.getFirstNCourses(limit);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/log", async (req, res) => {
  try {
    const maxCredits = parseInt(req.query.maxCredits) || 4;
    const courses = await db.getLOGCoursesLessCredits(maxCredits);
    res.json(courses);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

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

router.post("/", async (req, res) => {
  try {
    const course = req.body;
    if (!course.sigle || !course.credits) {
      return res.status(400).json({ error: "Le sigle et les crédits sont requis" });
    }
    await db.addCourse(course);
    res.status(201).json(course);
  } catch (e) {
    if (e.code === 11000) { // Erreur de clé dupliquée de MongoDB
      return res.status(409).json({ error: `Un cours avec le sigle "${req.body.sigle}" existe déjà` });
    }
    res.status(500).json({ error: e.message });
  }
});

router.patch("/:sigle", async (req, res) => {
  try {
    const { credits } = req.body;
    const updated = await db.modifyCourse(req.params.sigle, credits);
    if (!updated) {
      return res.status(404).json({ error: `Aucun cours trouvé pour le sigle : ${req.params.sigle}` });
    }
    res.json({ sigle: req.params.sigle, credits });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    await db.deleteAll();
    res.json({ message: "Tous les cours ont été supprimés" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/admin/reset", async (req, res) => {
  try {
    await db.populateDB();
    res.json({ message: "Collection réinitialisée avec 3 cours" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:sigle", async (req, res) => {
  try {
    const deleteAll = req.query.deleteAll === "true";
    const deleted = await db.deleteCourse(req.params.sigle, deleteAll);
    if (!deleted) {
      return res.status(404).json({ error: `Aucun cours trouvé pour le sigle : ${req.params.sigle}` });
    }
    res.json({ sigle: req.params.sigle });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
