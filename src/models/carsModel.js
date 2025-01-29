const database = require('../utils/database');


exports.getBrands = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT brand FROM cars';
        database.execute(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.getModels = (brand) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT model FROM cars WHERE brand = ?';
        database.execute(query, [brand], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.getEngines = (brand, model) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT engine FROM cars WHERE brand = ? AND model = ?';
        database.execute(query, [brand, model], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}
