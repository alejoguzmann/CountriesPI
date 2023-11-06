const { Country, Activity } = require("../db");
const { Op } = require('sequelize'); 


const getCountryForIDHandler  = async (req, res) => {

  const { ID } = req.params;

  try {
    
    const country = await Country.findOne({
      where: { ID:  { [Op.iLike]: `%${ID}%`, } },
    });

    if (!country) {
      return res.status(404).json({ message: 'country not found.' });
    }

    res.status(200).json(country); 

  } catch (error) {
  
    return res.status(500).json({ error: error.message });
  
}}
  
module.exports = getCountryForIDHandler ;