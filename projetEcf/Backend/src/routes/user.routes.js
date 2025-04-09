import { userController } from '../controllers/userController.js';

// Classes gestion des routes ou endpoints
export const userRoutes = async (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/users/login' && method === 'POST') {
        await userController.login(req, res);
        return true;
    } else if (url === '/users/register' && method === 'POST') {
        await userController.register(req, res);
        return true;
    } else if (url === '/users/logout' && method === 'POST') {
        await userController.logout(req, res);
        return true;
    } else if (url === '/users/refresh' && method === 'POST') {
        await userController.refresh(req, res);
        return true;
    } else if (url.startsWith('/users/username/') && method === 'GET') {
        const username = url.split('/')[3];
        await userController.findByUsername(req, res, username);
        return true;
    } else if (url.startsWith('/users/email/') && method === 'GET') {
        const email = url.split('/')[3]; 
        await userController.findByEmail(req, res, email);
        return true;
    } else if (url === '/users' && method === 'GET') {
        await userController.getAllUsers(req, res);
        return true;
    } else if (url.startsWith('/users/') && method === 'GET') {
        const id = url.split('/')[2];
        await userController.getUserById(req, res, id);
        return true;
    } else if (url === '/users' && method === 'POST') {
        await userController.createUser(req, res);
        return true;
    } else if (url.startsWith('/users/') && method === 'PUT') {
        const id = url.split('/')[2];
        await userController.updateUser(req, res, id);
        return true;
    } else if (url.startsWith('/users/') && method === 'DELETE') {
        const id = url.split('/')[2];
        await userController.deleteUser(req, res, id);
        return true;
    }
    
};

/*
server.on('request', async (req, res) => {
    if (req.url === '/profile' && req.method === 'GET') {
        const authedReq = await authMiddleware(req, res);
        if (!authedReq) return; 
  
        const user = authedReq.user;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, ' + user.username }));
    }
});
*/