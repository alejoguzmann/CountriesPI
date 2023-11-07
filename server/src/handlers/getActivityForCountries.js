const { Country, Activity } = require("../db");
const { Op } = require('sequelize')

const getActivityForCountriesHandler = async (req, res) => {

    const { ID } = req.params;
  
    try {
      
      const country = await Country.findOne({
        where: { ID:  { [Op.iLike]: `%${ID}%`, } },
      });
  
      const activities = await Activity.findAll({
        where: {
          countries: { [Op.contains]: [country.ID] }
        },
        attributes: ['name', 'difficulty', 'duration', 'season'] 
      });
  
      const mappedActivities = activities.map(activity => ({
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
      }));
  
      country.activities = mappedActivities
  
      console.log(mappedActivities)
  
      if (!country) {
        return res.status(404).json({ message: 'activites not found.' });
      }
  
      res.status(200).json(mappedActivities); 
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
module.exports = getActivityForCountriesHandler;