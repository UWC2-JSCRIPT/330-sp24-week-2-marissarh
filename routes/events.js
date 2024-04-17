const { Router } = require("express");
const Events = require('../models/events');
const Calendars = require('../models/calendars');

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
      const events = await Events.findById(req.params.id);
      if (!events || events.length === 0) {
        return res.status(404).json({message: 'No events found for the calendar.'});
      } 
      res.status(200).json(events);
     } catch (error) {
        res.status(500).json({message:'Server error'});
      }
  });

router.get("/:id", async (req, res) => {
    try {
      const event = await Events.findById(req.params.id);
      if (!event) {
        return res.status(404).json({message: 'Event not found.'});
      } 
      res.status(200).json(event);
     } catch (error) {
        res.status(500).json({message:'Server error'});
      }
  });

  router.post("/", async (req, res) => {
    try {
        const {name, date} = req.body;
        if (!name || !date){
            return res.status(400).json({message: 'Name and date are required.'});
        }
    const event = new Events({ name, date, calendarId: req.params.calendarId});
    await event.save();
    res.status(200).json(event);
        
    }catch (error){
        res.status(500).json({message:'Server error'});
    }
});


module.exports = router;