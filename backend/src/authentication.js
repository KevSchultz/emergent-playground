/*
#######################################################################
#
# Copyright (C) 2020-2022 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without 
# the express written permission of the copyright holder.
#
#######################################################################
*/

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const secrets = require('../data/secrets');
var users = require('../data/users.json');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find((user) => {
        return user.email === email && bcrypt.compareSync(password, user.password);
    });
    if (user) {
        const accessToken = jwt.sign({ email: user.email, role: user.role }, secrets.accessToken, {
            expiresIn: '30m',
            algorithm: 'HS256',
        });
        res.status(200).json({ name: user.name, accessToken: accessToken });
    } else {
        res.status(401).send('Invalid credentials');
    }
};

exports.check = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secrets.accessToken, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
