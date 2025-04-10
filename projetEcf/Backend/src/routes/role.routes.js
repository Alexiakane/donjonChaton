import { roleController } from '../controllers/roleController.js';

// Classes gestion des routes ou endpoints
export const roleRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/roles' && method === 'GET') {
        await roleController.getAllRoles(req, res);
        return true;
    } else if (url.startsWith('/role/') && method === 'GET') {
        const id = url.split('/')[2];
        await roleController.getRoleById(req, res, id);
        return true;
    } else if (url === '/role' && method === 'POST') {
        await roleController.createRole(req, res);
        return true;
    } else if (url.startsWith('/role/') && method === 'PUT') {
        const id = url.split('/')[2];
        await roleController.updateRole(req, res, id);
        return true;
    } else if (url.startsWith('/role/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await roleController.deleteRole(req, res, id);
        return true;
    }
};