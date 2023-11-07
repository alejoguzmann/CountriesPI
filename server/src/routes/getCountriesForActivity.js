const { Router } = require("express");
const getCountriesForActivityHandler = require('../handlers/getCountriesForActivityHandler')

const router = Router();

router.get('/activity', getCountriesForActivityHandler);

module.exports = router;
