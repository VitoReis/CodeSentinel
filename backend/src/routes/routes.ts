import { analyze } from "../services/analyze";
const express = require("express");
const router = express.Router();

router.post("/api/send-code", analyze);

module.exports = router;
