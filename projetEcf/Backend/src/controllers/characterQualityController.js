import { characterQualityService } from '../services/characterQualityService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';


export const characterQualityController = {

    getAllCharacterQualities: async (req, res) => {
        try {
            const characterQualities = await characterQualityService.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, characterQualities: characterQualities }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getCharacterQualitiesByCharacterId: async (req, res, id) => {
        try {
            const characterQualities = await characterQualityService.getByCharacterId(id);
            if (characterQualities) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, characterQualities: characterQualities }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Aucune qualité trouvée pour ce personnage' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getCharacterQualityById: async (req, res, idcharacter, idquality) => {
        try {
            const characterQuality = await characterQualityService.get(idcharacter, idquality);
            if (characterQuality) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, characterQuality: characterQuality }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Qualité de personnage non trouvée' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    createCharacterQuality: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const characterQuality = await characterQualityService.create(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, characterQuality: characterQuality }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    updateCharacterQuality: async (req, res, idcharacter, idquality) => {
        try {
            const body = await parseRequestBody(req);
            const characterQuality = await characterQualityService.update(idcharacter, idquality, body);
            if (characterQuality) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, characterQuality: characterQuality }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Qualité de personnage non trouvée' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    deleteCharacterQuality: async (req, res, idcharacter, idquality) => {
        try {
            const result = await characterQualityService.delete(idcharacter, idquality);
            if (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Qualité de personnage supprimée avec succès' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Qualité de personnage non trouvée' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    }
};