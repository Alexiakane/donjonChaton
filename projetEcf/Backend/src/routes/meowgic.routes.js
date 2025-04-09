import { meowgicController } from '../controllers/meowgicController.js';

// Classes gestion des routes ou endpoints
export const meowgicRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/meowgic' && method === 'GET') {
        await meowgicController.getAllMeowgics(req, res);
        return true;
    } else if (url.startsWith('/meowgic/') && method === 'GET') {
        const id = url.split('/')[2];
        await meowgicController.getMeowgicById(req, res, id);
        return true;
    } else if (url === '/meowgic' && method === 'POST') {
        await meowgicController.createMeowgic(req, res);
        return true;
    } else if (url.startsWith('/meowgic/') && method === 'PUT') {
        const id = url.split('/')[2];
        await meowgicController.updateMeowgic(req, res, id);
        return true;
    } else if (url.startsWith('/meowgic/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await meowgicController.deleteMeowgic(req, res, id);
        return true;
    }
};