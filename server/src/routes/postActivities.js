const { Router } = require("express");
const postActivities = require('../handlers/postActivitiesHandler');

const router = Router();

router.get('/activity', postActivities)

module.exports = router;

