const { Activity } = require('../models/activity');

exports.recordActivity = async (req, res) => {
  const { startDate, endDate, week, day, description, workingHours } = req.body;
  try {
    const newActivity = new Activity({ startDate, endDate, week, day, description, workingHours, userId: req.user.id });
    await newActivity.save();
    res.status(201).send('Activity recorded successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error recording activity');
  }
};

exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching activities');
  }
};

exports.editActivity = async (req, res) => {
  const { startDate, endDate, week, day, description, workingHours } = req.body;
  try {
    await Activity.findByIdAndUpdate(req.params.id, { startDate, endDate, week, day, description, workingHours });
    res.status(200).send('Activity edited successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error editing activity');
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).send('Activity deleted successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting activity');
  }
};
