import { characterController } from "../controllers/characterController.js";

// Classes gestion des routes ou endpoints
export const characterRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/characters' && method === 'GET') {
        await characterController.getAllCharacters(req, res);
        return true;
    } else if (url.startsWith('/character/full/') && method === 'GET') {
        const id = url.split('/')[3];
        await characterController.getCharacterFullById(req, res, id);
        return true;
    } else if (url.startsWith('/character/') && method === 'GET') {
        const id = url.split('/')[2];
        await characterController.getCharacterById(req, res, id);
        return true;
    } else if (url === '/character' && method === 'POST') {
        await characterController.createCharacter(req, res);
        return true;
    } else if (url.startsWith('/character/') && method === 'PUT') {
        const id = url.split('/')[2];
        await characterController.updateCharacter(req, res, id);
        return true;
    } else if (url.startsWith('/character/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await characterController.deleteCharacter(req, res, id);
        return true;
    }
};