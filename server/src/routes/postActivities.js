const { Router } = require("express");
const postActivitiesHandler = require('../handlers/postActivitiesHandler');

const router = Router();

router.get('/activity', postActivitiesHandler)

module.exports = router;

