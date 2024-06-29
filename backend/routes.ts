import { analise } from "./src/controllers/serverController";
const express = require("express");
const router = express.Router();

router.post("/api/send-code", analise);

module.exports = router;
