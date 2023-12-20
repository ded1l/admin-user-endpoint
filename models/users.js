const client = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
    let { username, password } = req.body;
    try {
        client.query(
            `SELECT * FROM users WHERE username = '${username}'`,
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: err });
                } else {
                    if (result.rows.length > 0) {
                        bcrypt.compare(
                            password,
                            result.rows[0].password,
                            (err, isMatch) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).json({ error: err });
                                } else {
                                    if (isMatch) {
                                        let token = jwt.sign(
                                            {
                                                id: result.rows[0].id,
                                                username: result.rows[0].username,
                                                role: result.rows[0].role,
                                            },
                                            // process.env.SECRET_KEY
                                        );
                                        res.json({
                                            message: "Login success",
                                            token: token,
                                        });
                                    } else {
                                        res.json({ message: "Password is incorrect" });
                                    }
                                }
                            }
                        );
                    } else {
                        res.json({ message: "User not found" });
                    }
                }
            }
        );
        
    } catch (error) {
        console.error(error);
    }}


const register = (req, res) => {
    let { username, password, role } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err });
        } else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: err });
                } else {
                    client.query(
                        `INSERT INTO users (username, password) VALUES ('${username}', '${hash}', ) RETURNING *`,
                        (err, result) => {
                            if (err) {
                                console.error(err);
                                res.status(500).json({ error: err });
                            } else {
                                res.json(result.rows);
                            }
                        }
                    );
                }
            });
        }
    });
}


module.exports = {
    login,
    register
};