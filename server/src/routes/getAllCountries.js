const { Router } = require("express");
const getAllCountries = require('../handlers/getAllCountriesHandler');

const router = Router();

router.get('/countries', getAllCountries)

module.exports = router;

