const Car = require('../models/carsModel.js');


exports.carBrands = async () => {
    const brands = await Car.getBrands();

    return brands;
}

exports.carModels = async (carData) => {
    const brands = await Car.getModels(carData.brand);

    return brands;
}

exports.carEngines = async (carData) => {
    const brands = await Car.getEngines(carData.brand, carData.model);

    return brands;
}
