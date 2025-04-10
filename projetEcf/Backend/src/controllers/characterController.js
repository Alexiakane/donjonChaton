import { characterService } from '../services/characterService.js';
import { parseRequestBody } from '../utils/httpHelper.js';
import { logError } from '../utils/logger.js';


export const characterController = {

    getAllCharacters: async (req, res) => {
        try {
            const characters = await characterService.getAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, characters: characters }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getCharacterFullById: async (req, res, id) => {
        try {
            const characterFull = await characterService.getFull(id);
            if (characterFull) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, characterFull: characterFull }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Personnage non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    getCharacterById: async (req, res, id) => {
        try {
            const character = await characterService.get(id);
            if (character) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, character: character }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Personnage non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },
    
    getCharactersByUserId: async (req, res, idUser) => {
        try {
            const characters = await characterService.getsByUserId(idUser);
            if (characters) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, characters: characters }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Personnages non trouvés' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    createCharacter: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const character = await characterService.create(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, character: character }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    updateCharacter: async (req, res, id) => {
        try {
            const body = await parseRequestBody(req);
            const character = await characterService.update(id, body);
            if (character) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, character: character }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Personnage non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    },

    deleteCharacter: async (req, res, id) => {
        try {
            const result = await characterService.delete(id);
            if (result) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Character supprimé avec succès'  }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Personnage non trouvé' }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: 'Erreur interne du serveur' }));
        }
    }
};