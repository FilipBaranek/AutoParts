const database = require('../utils/database');


exports.getCategories = (category) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories WHERE categoryname = ?';
        database.execute(query, [category], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}