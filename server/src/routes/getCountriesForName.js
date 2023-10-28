const { Router } = require("express");
const getCountriesForNameHandler = require("../handlers/getCountriesForNameHandler");

const router = Router();

router.get('/countries/name', getCountriesForNameHandler )

module.exports = router;