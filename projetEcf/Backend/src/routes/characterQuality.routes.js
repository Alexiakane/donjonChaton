import { characterQualityController } from '../controllers/characterQualityController.js';

// Classes gestion des routes ou endpoints
export const characterQualityRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/characterQualities' && method === 'GET') {
        await characterQualityController.getAllCharacterQualities(res);
        return true;
    } else if (url.startsWith('/characterQualities/character/') && method === 'GET') {
        const idcharacter = url.split('/')[3];
        await characterQualityController.getCharacterQualitiesByCharacterId(res, idcharacter);
        return true;
    } else if (url.startsWith('/characterQualities/') && method === 'GET') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.getCharacterQualityById(res, idcharacter, idquality);
        return true;
    } else if (url === '/characterQualities' && method === 'POST') {
        await characterQualityController.createCharacterQuality(req, res);
        return true;
    } else if (url.startsWith('/characterQualities/') && method === 'PUT') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.updateCharacterQuality(req, res, idcharacter, idquality);
        return true;
    } else if (url.startsWith('/characterQualities/') && method === 'DELETE') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.deleteCharacterQuality(res, idcharacter, idquality);
        return true;
    }
};