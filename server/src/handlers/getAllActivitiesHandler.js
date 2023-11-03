const { Activity } = require("../db");

const getAllActivitiesHandler = async (req, res) => {

try {
  const activities = await Activity.findAll()
  return res.status(200).json(activities)

} catch (error) {
  
  return res.status(500).json({ error: error.message });
  
}}
  
module.exports = getAllActivitiesHandler;