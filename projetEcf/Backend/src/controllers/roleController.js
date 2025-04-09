import { roleService } from '../services/roleService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';


export const roleController = {

    getAllRoles: async (req, res) => {
        try {
            const roles = await roleService.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: roles }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getRoleById: async (req, res, id) => {
        try {
            const role = await roleService.get(id);
            if (role) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: role }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Rôle non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    createRole: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const role = await roleService.create(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, data: role }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    updateRole: async (req, res, id) => {
        try {
            const body = await parseRequestBody(req);
            const role = await roleService.update(id, body);
            if (role) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, data: role }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Rôle non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    deleteRole: async (req, res, id) => {
        try {
            const result = await roleService.delete(id);
            if (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Rôle supprimé avec succès' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Rôle non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    }
};