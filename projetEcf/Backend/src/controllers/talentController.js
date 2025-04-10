import { talentService } from '../services/talentService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';


export const talentController = {

    getAllTalents: async (req, res) => {
        try {
            const talents = await talentService.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, talents: talents }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getTalentById: async (req, res, id) => {
        try {
            const talent = await talentService.get(id);
            if (talent) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, talent: talent }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Talent non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    createTalent: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const talent = await talentService.create(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, talent: talent }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    updateTalent: async (req, res, id) => {
        try {
            const body = await parseRequestBody(req);
            const talent = await talentService.update(id, body);
            if (talent) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, talent: talent }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Talent non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    deleteTalent: async (req, res, id) => {
        try {
            const result = await talentService.delete(id);
            if (result > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Talent supprimé avec succès' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Talent non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    }
};