import { groqAnalyze, groqModels, listLanguages } from "../services/groqCalls";
const express = require("express");
const router = express.Router();

router.post("/api/analyze", groqAnalyze);
router.get("/api/models", groqModels);
router.get("/api/languages", listLanguages);

module.exports = router;
