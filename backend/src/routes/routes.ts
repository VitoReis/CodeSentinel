import { groqCreate } from "../services/apiCalls";
import {
  availableModels,
  availableLanguages,
  analyze,
} from "../services/users";
const express = require("express");
const router = express.Router();

router.get("/api/availableModels", availableModels);
router.get("/api/availablelanguages", availableLanguages);
router.post("/api/send-code", analyze);
router.post("/api/groqCreate", groqCreate);

module.exports = router;
