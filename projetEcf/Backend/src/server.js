import http from 'http';
import router from './routes/index.js';
import { logRequest } from './utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

// creation du serveur http
const server = http.createServer(async (req, res) => {
    
    // configure les CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // gestion du Préflight CORS OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'CORS preflight response' }));
        return;   
    }

    // Log la requête reçue
    await logRequest(req.method, req.url);

    // appelle le systeme de route
    router(req, res);
});

// choix du port
const PORT = process.env.PORT || 4000;

//lancement du mode ecoute du serveur sur le port dédié
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
