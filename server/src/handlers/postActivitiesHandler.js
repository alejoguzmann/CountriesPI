const { Activity } = require('../db'); 

const postActivitiesHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    const existingActivity = await Activity.findOne({ where: { name } });

    if (existingActivity) {
      return res.status(400).json({ message: 'The activity already exists.' });
    }

    if (!countries || countries.length === 0) {
      return res.status(400).json({ message: 'You must relate at least one country to the activity.' });
    }


    const newActivity = await Activity.create({   
      name,
      difficulty,
      duration,
      season,
      countries, 
    });

    await newActivity.addCountry(countries);

    res.status(200).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = postActivitiesHandler

