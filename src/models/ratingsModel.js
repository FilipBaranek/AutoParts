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

exports.usersRating = (code, userID) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ratings WHERE code = ? AND user_id = ?';
        database.execute(query, [code, userID], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}