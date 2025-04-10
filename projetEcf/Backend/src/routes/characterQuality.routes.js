import { characterQualityController } from '../controllers/characterQualityController.js';

// Classes gestion des routes ou endpoints
export const characterQualityRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/characterQualities' && method === 'GET') {
        await characterQualityController.getAllCharacterQualities(req, res);
        return true;
    } else if (url.startsWith('/characterQualities/character/') && method === 'GET') {
        const idcharacter = url.split('/')[3];
        await characterQualityController.getCharacterQualitiesByCharacterId(req, res, idcharacter);
        return true;
    } else if (url.startsWith('/characterQuality/') && method === 'GET') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.getCharacterQualityById(req, res, idcharacter, idquality);
        return true;
    } else if (url === '/characterQuality' && method === 'POST') {
        await characterQualityController.createCharacterQuality(req, res);
        return true;
    } else if (url.startsWith('/characterQuality/') && method === 'PUT') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.updateCharacterQuality(req, res, idcharacter, idquality);
        return true;
    } else if (url.startsWith('/characterQuality/') && method === 'DELETE') {
        const idcharacter = url.split('/')[2];
        const idquality = url.split('/')[3];
        await characterQualityController.deleteCharacterQuality(req, res, idcharacter, idquality);
        return true;
    }
};