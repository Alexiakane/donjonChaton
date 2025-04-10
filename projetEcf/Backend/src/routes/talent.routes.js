import { talentController } from '../controllers/talentController.js';

// Classes gestion des routes ou endpoints
export const talentRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/talents' && method === 'GET') {
        await talentController.getAllTalents(req, res);
        return true;
    } else if (url.startsWith('/talent/') && method === 'GET') {
        const id = url.split('/')[2];
        await talentController.getTalentById(req, res, id);
        return true;
    } else if (url === '/talent' && method === 'POST') {
        await talentController.createTalent(req, res);
        return true;
    } else if (url.startsWith('/talent/') && method === 'PUT') {
        const id = url.split('/')[2];
        await talentController.updateTalent(req, res, id);
        return true;
    } else if (url.startsWith('/talent/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await talentController.deleteTalent(req, res, id);
        return true;
    }
};