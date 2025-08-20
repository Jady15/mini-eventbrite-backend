import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function signAccessToken(payload) {
    return jwt.sign(payload, env.jwt.accessSecret, { expiresIn: env.jwt.accessTTL});
}
export function signRefreshToken(payload) {
    return jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: env.jwt.refreshTTL});
}
export function verifyAccessToken(token) {
    return jwt.verify(token, env.jwt.accessSecret);
}
export function verifyRefreshToken() {
    return jwt.verify(token, env.jwt.refreshSecret);
}