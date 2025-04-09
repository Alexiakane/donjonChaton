import { userService } from '../services/userService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';


export const userController = {

    login: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.login(body.email, body.password);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    register: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.register(body.fullname, body.email, body.password, body.username);
            if (user) {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Erreur lors de l\'inscription' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },
    
    logout: async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token du header
            if (!token) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Token manquant' }));
                return;
            }
            await userService.logout(token); // Appeler le service de déconnexion
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Déconnexion réussie' }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    refresh: async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token du header
            if (!token) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Token manquant' }));
                return;
            }
            const newToken = await userService.refresh(token); // Appeler le service de rafraîchissement
            if (newToken) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, token: newToken }));
            } else {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Token invalide' }));
            }
        } catch (error) {

            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: users }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getUserById: async (req, res, id) => {
        try {
            const user = await userService.get(id);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    createUser: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.create(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: user }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    updateUser: async (req, res, id) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.update(id, body);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    deleteUser: async (req, res, id) => {
        try {
            const result = await userService.delete(id);
            if (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Utilisateur supprimé avec succès' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    findByUsername: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.findByUsername(body.username);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    findByEmail: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const user = await userService.findByEmail(body.email);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: user }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Utilisateur non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },
};
