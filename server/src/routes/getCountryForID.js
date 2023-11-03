const { Router } = require("express");
const getCountryForIDHandler = require("../handlers/getCountryForIDHandler");

const router = Router();

router.get('/countries/:ID', getCountryForIDHandler )

module.exports = router;