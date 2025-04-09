import { giftService } from "../services/giftService.js";
import { parseRequestBody } from "../utils/httpHelper.js";
import { logError } from "../utils/logger.js";


export const giftController = {

    getAllGifts: async (req, res) => {
        try {
            const gifts = await giftService.getAll();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, data: gifts }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Erreur interne du serveur" }));
        }
    },
    
    getGiftById: async (req, res, id) => {
        try {
            const gift = await giftService.get(id);
            if (gift) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, data: gift }));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Don non trouvé" }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Erreur interne du serveur" }));
        }
    },

    createGift: async (req, res) => {
        try {
            const body = await parseRequestBody(req);
            const gift = await giftService.create(body);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, data: gift }));
        } catch (error) {
            logError(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Erreur interne du serveur" }));
        }
    },

    updateGift: async (req, res, id) => {
        try {
            const body = await parseRequestBody(req);
            const gift = await giftService.update(id, body);
            if (gift) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, data: gift }));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Don non trouvé" }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Erreur interne du serveur" }));
        }
    },

    deleteGift: async (req, res, id) => {
        try {
            const gift = await giftService.delete(id);
            if (gift !== -1) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, message: "Don supprimé avec succès" }));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: false, error: "Don non trouvé" }));
            }
        } catch (error) {
            logError(error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Erreur interne du serveur" }));
        }
    }
};