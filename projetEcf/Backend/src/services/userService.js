import { userRepository } from '../repositories/userRepository.js';
import { User } from '../models/User.js';
import { logError } from '../utils/logger.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userService = {

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const token = jwt.sign({ id: user.id }, process.env.TOKEN, { expiresIn: '1h' });
        return { user, token };
    },

    async register(fullname, email, password, username) {
        const user = await userRepository.findByUsername(username);
        if (user) {
            return null;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, fullname, username, email, hashedPassword, null, 1);
        return await userRepository.create(newUser);
    },

    async logout(token) {
        // Invalidate the token (this is a placeholder, actual implementation may vary)
        return true;
    },

    async refresh(token) {
        //TODO
    },

    async getAll() {
        return await userRepository.getAll();
    },

    async get(id) {
        return await userRepository.get(id);
    },

    async create(userData) {
        let newUser = new User(
            null,
            userData.fullname,
            userData.username,
            userData.email,
            userData.password,
            userData.avatar,
            userData.idRole
        );

        const validation = newUser.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }   
        return await userRepository.create(newUser);
    },

    async update(id, userData) {
        return await userRepository.update(id, userData);
    },

    async delete(id) {
        return await userRepository.delete(id);
    },

    async findByUsername(username) {
        return await userRepository.findByUsername(username);
    },

    async findByEmail(email) {
        return await userRepository.findByEmail(email);
    },
};