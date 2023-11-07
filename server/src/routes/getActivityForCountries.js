const { Router } = require("express");
const getActivityForCountriesHandler = require('../handlers/getActivityForCountries')

const router = Router();

router.get('/activity/:ID', getActivityForCountriesHandler );

module.exports = router;
