const databaseInterface = require('./psqlconnect');
const databaseClient = databaseInterface.connectToDatabase();

const jsonWebTokenGenerator = require('./jsonWebTokenGenerator');
const jsonWebTokenAuthorize = require('./jsonWebTokenAuthorize');

var bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const user = await databaseInterface.createAccount(
            databaseClient,
            username,
            email,
            hashedPassword
        );

        const jsonWebToken = jsonWebTokenGenerator(user.userid);

        res.status(200).json({ accessToken: jsonWebToken });
    } catch (err) {
        res.status(401).json('Invalid.');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await databaseInterface.getAccountByEmail(databaseClient, email);
        const hashedPassword = user.password;

        const isValidPassword = await bcrypt.compare(password, hashedPassword);

        if (!isValidPassword) {
            throw new Error('Invalid.');
        }

        const jsonWebToken = jsonWebTokenGenerator(user.userid);

        res.status(200).json({ accessToken: jsonWebToken });
    } catch (err) {
        res.status(401).json('Invalid.');
    }
};

exports.check = (request, response, next) => {

    if (!request.headers.authorization) {
        return response.sendStatus('401');
    }

    const accessTokenString = request.headers.authorization; // Bearer <token>
    const accessToken = accessTokenString.split(' ')[1]; // <token>

    if (!accessToken) {
        return response.sendStatus('401');
    }

    const isValid = jsonWebTokenAuthorize(accessToken, request);

    console.log("isValid: ", isValid);

    if (!isValid) {
        return response.sendStatus(403);
    } else {
        console.log("calling next");
        next();
    }
};