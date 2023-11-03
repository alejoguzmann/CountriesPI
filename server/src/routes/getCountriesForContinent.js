const { Router } = require("express");
const getCountriesForContinentHandler = require("../handlers/getCountriesForContinentHandler")

const router = Router();

router.get('/continent', getCountriesForContinentHandler  )

module.exports = router;