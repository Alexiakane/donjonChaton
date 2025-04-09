import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ACCESS_LOG = path.join(__dirname, '../../logs/access.log');
const ERROR_LOG = path.join(__dirname, '../../logs/error.log');

export async function logRequest(method, url) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${method} ${url}\n`;

    try {
        // Append le message au fichier de log des accès
        await fs.appendFile(ACCESS_LOG, logMessage, 'utf8');
        console.log(`[LOG] Requête enregistrée : ${method} ${url}`);
    } catch (error) {
        console.error(`[ERREUR] Impossible d'écrire dans access.log : ${error.message}`);
    }
}

export async function logError(error) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${error.stack || error.message}\n`;

    try {
        // Append le message au fichier de log des erreurs
        await fs.appendFile(ERROR_LOG, logMessage, 'utf8');
        console.error(`[ERREUR] Enregistrée dans error.log : ${error.message}`);
    } catch (writeError) {
        console.error(`[CRITIQUE] Impossible d'écrire dans error.log : ${writeError.message}`);
    }
}
