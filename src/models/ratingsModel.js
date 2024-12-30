const database = require('../utils/database');


exports.getRatings = (code) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ratings WHERE code = ?';
        database.execute(query, [code], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}