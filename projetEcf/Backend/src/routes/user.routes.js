import { userController } from '../controllers/userController.js';

// Classes gestion des routes ou endpoints
export const userRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/user/login' && method === 'POST') {
        await userController.login(req, res);
        return true;
    } else if (url === '/user/register' && method === 'POST') {
        await userController.register(req, res);
        return true;
    } else if (url === '/user/logout' && method === 'POST') {
        await userController.logout(req, res);
        return true;
    } else if (url === '/user/refresh' && method === 'GET') {
        await userController.refresh(req, res);
        return true;
    } else if (url.startsWith('/user/username/') && method === 'GET') {
        const username = url.split('/')[3];
        await userController.findByUsername(req, res, username);
        return true;
    } else if (url.startsWith('/user/email/') && method === 'GET') {
        const email = url.split('/')[3]; 
        await userController.findByEmail(req, res, email);
        return true;
    } else if (url === '/users' && method === 'GET') {
        await userController.getAllUsers(req, res);
        return true;
    } else if (url.startsWith('/user/') && method === 'GET') {
        const id = url.split('/')[2];
        await userController.getUserById(req, res, id);
        return true;
    } else if (url.startsWith('/user/') && method === 'PUT') {
        const id = url.split('/')[2];
        await userController.updateUser(req, res, id);
        return true;
    } else if (url.startsWith('/user/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await userController.deleteUser(req, res, id);
        return true;
    }
    
};
