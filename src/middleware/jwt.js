const
    jwt = require('jsonwebtoken'),
    PRIVATE_KEY = process.env.PRIVATE_KEY,
    EXPIRATION_DATE = process.env.EXPIRATION_DATE

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: EXPIRATION_DATE })
    return token;
}

const authenticateToken = (req, res, next) => {
    const token = req.cookies["token"];
    if (token == null) return res.status(401).json({ message: 'User not allowed' })

    jwt.verify(token, PRIVATE_KEY, (err, user) => {
        if (err) return res.status(403);
        next();
    })
}

const deleteToken = (req, res, next) => {
    if (req.cookies["token"] == null) {
        return res.status(404).json({ message: "No hay token" })
    }
    res.clearCookie("token");
    next();
}

module.exports = { generateToken, authenticateToken, deleteToken };