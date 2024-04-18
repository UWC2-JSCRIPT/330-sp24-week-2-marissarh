const { Router } = require("express");
const Events = require('../models/events');
const Calendars = require('../models/calendars');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
      const calendarId = req.params.calendarId;
      const calendar = await Calendars.findById(calendarId);
      if (!calendar) {
        return res.status(404).json({message: 'Calendar not found.'});
      }
      const events = await Events.find({calendarId: calendarId}).lean();
      if (!events || events.length === 0){
        return res.status(404).json({message:'No events found for the calendar.'}); // Return 404 status
      }

      res.status(200).json(events);
     } catch (error) {
        res.status(500).json({message:'Server error'});
      }
  });

router.get('/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const event = await Events.findById(eventId).lean();
      if (!event) {
        return res.status(200).json({message: 'Event not found.'});
      } 
      if (event.calendarId.toString() !==req.params.calendarId){
       return res.status(404).json({message: 'Event not found for this calendar'});
     } 
     res.status(200).json(event);
    }
     catch (error) {

        res.status(404).json({message:'Server error'});
      }
      
  });

  router.post('/', async (req, res) => {
    try { 
        const calendarExists = await Calendars.exists({ _id: req.params.calendarId});
        if (!calendarExists){
            return res.status(404).json({message: 'Calendar not found.'});
        }
        const {name, date} = req.body;
        if (!name || !date){
            return res.status(400).json({message: 'Name and date are required.'});
        }
    const event = new Events({ name, date, calendarId: req.params.calendarId });
    await event.save();
    res.status(200).json(event); 
    }
    catch (error){
        res.status(500).json({message:'Server error'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        
        const eventId = req.params.id;
        const { name, date } = req.body;
        const event = await Events.findById(eventId);
        if (!event){
            return res.status(404).json({message: 'Event not found'});
        }
        if (event.calendarId.toString() !== req.params.calendarId){
            return res.status(404).json({message:'Calendar Id does not match event'});
        }
        if(name){
            event.name = name;  
        }
        if (date){
            event.date = date;
        }
    await event.save();
    res.status(200).json(event);
    }
    catch (error){
        res.status(500).json({message:'Server error'});
    }
});

router.delete('/:id', async (req, res) => {
    try {

        const event = await Events.findById(req.params.id);
        if (!event){
            return res.status(404).json({message: 'Event not found.'});
        }
        if (event.calendarId.toString() !== req.params.calendarId){
            return res.status(404).json({message:'Calendar ID does not match event'})
        }
    await event.deleteOne();
    res.status(200).json({message: 'Event deleted.'});
    }
    catch (error)
    {

        res.status(404).json({message:'Server error'});
    }
});




module.exports = router;