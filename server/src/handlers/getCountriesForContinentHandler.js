const { Country } = require("../db");
const { Op } = require('sequelize'); //para buscar sin importar mayus o minus


const getCountriesForContinentHandler = async (req, res) => {

   const { continents } = req.query;

   try {
     const countriesForContinent = await Country.findAll({
       where: {  continents: { [Op.iLike]: `%${continents}%`, }, },
     });
 
     if (countriesForContinent.length === 0) {
       res.status(404).json({ message: 'countries not found.' });
     } else {
       res.status(200).json(countriesForContinent);
     }
   } catch (error) {
    return res.status(500).json({ error: error.message });
   }

};

module.exports = getCountriesForContinentHandler;