import { qualityController } from '../controllers/qualityController.js';

// Classes gestion des routes ou endpoints
export const qualityRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/quality' && method === 'GET') {
        await qualityController.getAllQuality(req, res);
        return true;
    } else if (url.startsWith('/quality/') && method === 'GET') {
        const id = url.split('/')[2];
        await qualityController.getQualityById(req, res, id);
        return true;
    } else if (url === '/quality' && method === 'POST') {
        await qualityController.createQuality(req, res);
        return true;
    } else if (url.startsWith('/quality/') && method === 'PUT') {
        const id = url.split('/')[2];
        await qualityController.updateQuality(req, res, id);
        return true;
    } else if (url.startsWith('/quality/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await qualityController.deleteQuality(req, res, id);
        return true;
    }
};