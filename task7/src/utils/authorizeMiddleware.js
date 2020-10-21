import jwt from 'jsonwebtoken';

const UNPROTECTED_ENDPOINTS = ['/login'];

export default function checkToken(req, res, next) {
    if (UNPROTECTED_ENDPOINTS.includes(req.url)) {
        return next();
    }
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
