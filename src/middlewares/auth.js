import { unauthorized, forbidden } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";


export function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return next(unauthorized('Missing Bearer Token'));
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (err) {
        next(unauthorized('Invalid or expired token'));
    }
}

export function requireRole(...role) {
    return (req, res, next) => {
        if (!req.user) return next(unauthorized());
        if (!role.includes(req.user.role)) return next(forbidden('Insufficient role'));
        next();
    }


    // try {
    //     const payload = verifyAccessToken(token);
    //     req.user = payload;
    //     next();
    // } catch (err) {
    //     next(unauthorized('Invalid or expired token'));
    // }
}