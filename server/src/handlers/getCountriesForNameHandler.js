const { Country } = require("../db");
const { Op } = require('sequelize'); //para buscar sin importar mayus o minus


const getCountriesForNameHandler = async (req, res) => {

   const { name } = req.query;

   try {
     const countriesForName = await Country.findAll({
       where: {
         name: { [Op.iLike]: `%${name}%`, },
       },
     });
 
     if (countriesForName.length === 0) {
       res.status(404).json({ message: 'country not found.' });
     } else {
       res.status(200).json(countriesForName);
     }
   } catch (error) {
    return res.status(500).json({ error: error.message });
   }

};

module.exports = getCountriesForNameHandler;