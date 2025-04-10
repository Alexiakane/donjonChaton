import { characterRoutes } from './character.routes.js';
import { traitRoutes } from './trait.routes.js';
import { childhoodRoutes } from './childhood.routes.js';
import { equipmentRoutes } from './equipment.routes.js';
import { qualityRoutes } from './quality.routes.js';
import { talentRoutes } from './talent.routes.js';
import { roleRoutes } from './role.routes.js';
import { meowgicRoutes } from './meowgic.routes.js';
import { userRoutes } from './user.routes.js';
import { characterQualityRoutes } from './characterQuality.routes.js';
import { logError } from '../utils/logger.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const allRoutes = [
    characterRoutes, 
    traitRoutes, 
    childhoodRoutes, 
    equipmentRoutes,
    qualityRoutes,
    talentRoutes,
    roleRoutes,
    meowgicRoutes,
    userRoutes,
    characterQualityRoutes
];

export default async function router(req, res) {
    
    // Vérification de l'authentification pour les routes de notre serveur 
    // (sauf login et register qui sont publiques)
    if (req.url != '/user/login' && req.url != '/user/register') {
        const authedReq = await authMiddleware(req, res);
        if (!authedReq) return; 
        const user = authedReq.user;
    }    

    // recherche de la route correspondante
    for (const routeHandler of allRoutes) {
        const handled = await routeHandler(req, res);
        if (handled) return; // Si une route a géré la requête, on arrête
    }

    // Si aucune route n'a pris en charge la requête
    const { url, method } = req;
    const err = new Error(`Route non trouvée: ${method} ${url}`);
    logError(err);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
}