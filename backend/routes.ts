const express = require("express")
const router = express.Router()
const ServerController = require("./src/controllers/serverController")

router.post("/api/send-code", ServerController.analise);

module.exports = router