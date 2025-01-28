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

exports.findPartByCompatibleCode = (code) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM parts WHERE FIND_IN_SET(?, compatible_codes) > 0';
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

exports.findBrandsByCompatibleCode = (code) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT DISTINCT brand FROM parts WHERE FIND_IN_SET(?, compatible_codes) > 0';
        database.execute(query, [code], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.sortParts = (filters, params) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM parts WHERE subcategory = ? AND engine = ? ${filters}`;
        database.execute(query, params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.sortPartsByCode = (filters, params) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM parts WHERE code = ? ${filters}`;
        database.execute(query, params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.sortPartsByCompatibleCode = (filters, params) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM parts WHERE FIND_IN_SET(?, compatible_codes) > 0 ${filters}`;
        database.execute(query, params, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}


