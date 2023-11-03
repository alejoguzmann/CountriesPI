const { Router } = require("express");
const getAllCountries = require('./getAllCountries');
const getCountriesForName = require("./getCountriesForName");
const getAllActivities = require('./getAllActivities')
const postActivities = require('./postActivities')
const getCountryForID = require('./getCountryForID')
const getCountriesForContinent = require('./getCountriesForContinent')
const getCountriesForActivity = require('./getCountriesForActivity')

const router = Router();

router.use(getCountriesForName)
router.use(getCountryForID)
router.use(getAllCountries)
router.use(getAllActivities)
router.use(postActivities)
router.use(getCountriesForContinent)
router.use(getCountriesForActivity)



module.exports = router;
