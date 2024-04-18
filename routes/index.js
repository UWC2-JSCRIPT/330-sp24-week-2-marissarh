const { Router } = require("express");
const router = Router();
const Events = require('../models/events');
const calendars = require("../models/calendars");

router.use("/calendars", require('./calendars'));
router.use("/calendars/:calendarId/events", require('./events'));



module.exports = router;