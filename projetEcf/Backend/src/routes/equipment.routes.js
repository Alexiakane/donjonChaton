import { equipmentController } from '../controllers/equipmentController.js';

// Classes gestion des routes ou endpoints
export const equipmentRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/equipments' && method === 'GET') {
        await equipmentController.getAllEquipments(req, res);
        return true;
    } else if (url.startsWith('/equipment/') && method === 'GET') {
        const id = url.split('/')[2];
        await equipmentController.getEquipmentById(req, res, id);
        return true;
    } else if (url === '/equipment' && method === 'POST') {
        await equipmentController.createEquipment(req, res);
        return true;
    } else if (url.startsWith('/equipment/') && method === 'PUT') {
        const id = url.split('/')[2];
        await equipmentController.updateEquipment(req, res, id);
        return true;
    } else if (url.startsWith('/equipment/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await equipmentController.deleteEquipment(req, res, id);
        return true;
    }
};