const database = require('../utils/database');


exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        database.execute(query, [email], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res[0] : null);
            }
        });
    });
};

exports.createUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT IGNORE INTO users (username, email, password) VALUES (?, ?, ?)';          //ignore aby mohli mať rovnaké meno
        database.execute(query, [username, email, password], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        database.execute(query, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res[0] : null);
            }
        });
    });
};

exports.getPassword = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT password FROM users WHERE id = ?';
        database.execute(query, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res && res.length > 0 ? res[0].password : null);
            }
        });
    });
}

exports.changePassword = (password, id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET password = ? WHERE id = ?';
        database.execute(query, [password, id], (err, res) => {
            if (err) {
                reject(err);
            } else if (res.affectedRows === 0) {
                resolve(false);
            } else {
                resolve(res);
            }
        });
    });
}

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        database.execute(query, [id], (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

