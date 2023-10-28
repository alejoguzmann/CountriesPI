const { Country } = require("../db");

const getAllCountriesHandler = async (req, res) => {

try {
  const countries = await Country.findAll()
  return res.status(200).json(countries)

} catch (error) {
  
  return res.status(500).json({ error: error.message });
  
}}
  
module.exports = getAllCountriesHandler;