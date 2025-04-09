import { giftController } from '../controllers/giftController.js';

// Classes gestion des routes ou endpoints
export const giftRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/gifts' && method === 'GET') {
        await giftController.getAllGifts(req, res);
        return true;
    } else if (url.startsWith('/gifts/') && method === 'GET') {
        const id = url.split('/')[2];
        await giftController.getGiftById(req, res, id);
        return true;
    } else if (url === '/gifts' && method === 'POST') {
        await giftController.createGift(req, res);
        return true;
    } else if (url.startsWith('/gifts/') && method === 'PUT') {
        const id = url.split('/')[2];
        await giftController.updateGift(req, res, id);
        return true;
    } else if (url.startsWith('/gifts/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await giftController.deleteGift(req, res, id);
        return true;
    }
};