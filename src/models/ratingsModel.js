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

exports.usersRating = (code, userId) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ratings WHERE code = ? AND user_id = ?';
        database.execute(query, [code, userId], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.createRating = (code, userId, value) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT IGNORE INTO ratings (code, user_id, value) VALUES (?, ?, ?)';
        database.execute(query, [code, userId, value], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.removeRating = (code, userId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM ratings WHERE code = ? AND user_id = ?';
        database.execute(query, [code, userId], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
