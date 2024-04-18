const Calendars = require('../models/calendars');

module.exports = {};

module.exports.getAll = async() => {
  try {
    const calendars = await Calendars.find({}).lean();
    return calendars;
  } catch (e) {
    return [ ];
  }
};
  
module.exports.create = async (name) => {
  try {
    const calendar = await Calendars.create({name});
    return calendar;
} catch (e) {
  return null;
}
};

module.exports.getById = async (id) => {
  try {
    const calendar = await Calendars.findOne({ _id: id }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (id) => {
  try {
    const calendar = await Calendars.findByIdAndRemove(id).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};