import { childhoodController } from '../controllers/childhoodController.js';

// Classes gestion des routes ou endpoints
export const childhoodRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/childhoods' && method === 'GET') {
        await childhoodController.getAllChildhoods(req, res);
        return true;
    } else if (url.startsWith('/childhood/') && method === 'GET') {
        const id = url.split('/')[2];
        await childhoodController.getChildhoodById(req, res, id);
        return true;
    } else if (url === '/childhood' && method === 'POST') {
        await childhoodController.createChildhood(req, res);
        return true;
    } else if (url.startsWith('/childhood/') && method === 'PUT') {
        const id = url.split('/')[2];
        await childhoodController.updateChildhood(req, res, id);
        return true;
    } else if (url.startsWith('/childhood/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await childhoodController.deleteChildhood(req, res, id);
        return true;
    }
};