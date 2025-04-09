import jwt from 'jsonwebtoken';
import { logError } from '../utils/logger.js';
import { userRepository } from '../repositories/userRepository.js';

export default async function authMiddleware(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        console.log('Authorization header:', req.headers['authorization']);

        if (!token) {
            const err = new Error(`No token provided`);
            logError(err);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No token provided' }));
            return null;
        }

        const decoded = jwt.verify(token, process.env.TOKEN);

        const user = await userRepository.get(decoded.id);

        if (!user) {
            const err = new Error(`User not found`);
            logError(err);
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return null;
        }

        req.user = user;
        return req; 

    } catch (err) {
        const errtolog = new Error(`Invalid token ${err}`);
        logError(errtolog);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid token' }));
        return null;
    }
}
