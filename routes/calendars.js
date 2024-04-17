const { Router } = require("express");

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch(e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.post("/", async(req, res, next)=>{
  try{
    const { name } =req.body;
    if (!name) {
      return res.status(400).json({message: 'Name is required.'});
    }
    const newCalendar = await CalendarDAO.create({name});
    res.status(200).json(newCalendar);
  }catch(e)
{
  next(e);
}  
});

router.put("/:id", async(req, res, next) =>{
  try {
    const {name} = req.body;
    if(!name){
      return res.status(400).json({message: 'Name is required.'});
    }
    const updatedCalendar = await CalendarDAO.updateById(req.params.id, {name});
    if (updatedCalendar){
      res.status(200).json(updatedCalendar);
    } else{
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const removedCalendar = await CalendarDAO.removeById(req.params.id);
    if (removedCalendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch(e) {
    next(e);
  }
});

module.exports = router;