const { Router } = require("express");
const postActivitiesHandler = require('../handlers/postActivitiesHandler');


const router = Router();

router.post('/activity', postActivitiesHandler  )

module.exports = router;

