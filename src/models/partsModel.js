const database = require('../utils/database');


exports.getParts = (partName, engine) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM parts WHERE subcategory = ? AND engine = ?';
        database.execute(query, [partName, engine], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.getPartsByCode = (code) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM parts WHERE code = ?';
        database.execute(query, [code], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.findBrands = (partName, engine) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT brand FROM parts WHERE subcategory = ? AND engine = ?';
        database.execute(query, [partName, engine], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.findBrandsByCode = (code) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT brand FROM parts WHERE code = ?';
        database.execute(query, [code], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.sortParts = (conditions, params) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM parts WHERE subcategory = ? AND engine = ? ${conditions}`;
        database.execute(query, params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}
