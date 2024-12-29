const Car = require('../models/carsModel.js');


exports.carBrands = async () => {
    const brands = await Car.getBrands();

    return brands;
}

exports.carModels = async (req) => {
    const brands = await Car.getModels(req.body.brand);

    return brands;
}

exports.carEngines = async (req) => {
    const brands = await Car.getEngines(req.body.brand, req.body.model);

    return brands;
}
