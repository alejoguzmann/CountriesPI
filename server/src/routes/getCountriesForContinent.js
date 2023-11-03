const { Router } = require("express");
const getCountriesForContinentHandler = require("../handlers/getCountriesForContinentHandler")

const router = Router();

router.get('/continents', getCountriesForContinentHandler  )

module.exports = router;