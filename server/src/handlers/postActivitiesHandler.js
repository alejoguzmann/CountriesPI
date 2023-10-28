const { Activity, Country } = require('../db'); 

// Ruta POST para crear una actividad turística
const postActivitiesHandler = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    const existingActivity = await Activity.findOne({ where: { name } });                             //por si existe

    if (existingActivity) {
      return res.status(400).json({ message: 'the activity already exists.' });
    }

    if (!countries || countries.length === 0) {                                                       // relacionar el pais con una actividad al menos
      return res.status(400).json({ message: 'You must relate at least one country to the activity.' });
    }

    const newActivity = await Activity.create({   //crea actividad
      name,
      difficulty,
      duration,
      season,
    });

  
    await newActivity.addCountry(countries); //relaciona paises con la actividad

    res.status(200).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = postActivitiesHandler

