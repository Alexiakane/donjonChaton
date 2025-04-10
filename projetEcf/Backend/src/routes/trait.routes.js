import { traitController } from '../controllers/traitController.js';

// Classes gestion des routes ou endpoints
export const traitRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/traits' && method === 'GET') {
        await traitController.getAllTraits(req, res);
        return true;
    } else if (url.startsWith('/trait/') && method === 'GET') {
        const id = url.split('/')[2];
        await traitController.getTraitById(req, res, id);
        return true;
    } else if (url === '/trait' && method === 'POST') {
        await traitController.createTrait(req, res);
        return true;
    } else if (url.startsWith('/trait/') && method === 'PUT') {
        const id = url.split('/')[2];
        await traitController.updateTrait(req, res, id);
        return true;
    } else if (url.startsWith('/trait/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await traitController.deleteTrait(req, res, id);
        return true;
    }
};