const { Router } = require("express");
const { Activity, Country } = require('../db');
const { Op } = require('sequelize')

const router = Router();

router.get('/activity', async (req, res) => {
  const { nameActivity } = req.query;

  try {
    const activity = await Activity.findOne({
        where: { name: nameActivity }
      })
    const idsCountries = activity.countries
    console.log(idsCountries);

    const countries = await Country.findAll({
        where: { ID: {
            [Op.in]: idsCountries
          } },
      });

  return res.status(200).json(countries)
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
