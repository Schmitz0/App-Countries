const { Router } = require('express');
const {countriesLoader,findCountriesbyId, findCountry} = require('./controllers.js')
const {Country,Activities} = require('../../db.js');


const router = Router();

router.get('/', async (req,res) => {
    const {name} = req.query;
    const totalCountry = await findCountry();
    try{
        if(name) {
            const countryFilter = await totalCountry.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()));
            countryFilter ? res.status(200).send(countryFilter) : res.status(400).send('No se encontro');
        } else {
            res.status(200).send(totalCountry)
        }
    }catch(error){
    res.status(404).send(error.message);
    }
});

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const countries = await findCountry();
        const countries_filter = findCountriesbyId(id,countries);
        res.status(200).send(countries_filter);
    }catch(error){
    res.status(404).send(error.message);
    }
});



module.exports = router;