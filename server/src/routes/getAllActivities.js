const { Router } = require("express");
const getAllActivities = require('../handlers/getAllActivitiesHandler');

const router = Router();

router.get('/activities', getAllActivities)

module.exports = router;

