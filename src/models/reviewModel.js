const database = require('../utils/database');


exports.createReview = (review, userId, username, productCode) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO reviews (review, user_id, username, product_code) VALUES (?, ?, ?, ?)';
        database.execute(query, [review, userId, username, productCode], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.findReviews = (productCode) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM reviews WHERE product_code = ?';
        database.execute(query, [productCode], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res : null);
            }
        });
    });
}

exports.deleteReview = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM reviews WHERE id = ?';
        database.execute(query, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.editReview = (review, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE reviews SET review = ? WHERE id = ?';
        database.execute(query, [review, id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
