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

    // Convertir season y countries a arreglos si no lo son
    const newSeason = Array.isArray(season) ? season : [season];
    const newCountries = Array.isArray(countries) ? countries : [countries];

    const newActivity = await Activity.create({   
      name,
      difficulty,
      duration,
      season: newSeason,  // Asignar el nuevo arreglo
      countries: newCountries,  // Asignar el nuevo arreglo
    });

    await newActivity.addCountry(newCountries);

    res.status(200).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = postActivitiesHandler

