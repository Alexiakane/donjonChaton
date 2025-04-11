import http from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendDir = join(__dirname, 'html'); // Dossier racine pour les fichiers HTML

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};



const serveStaticFile = async (filePath, res) => {
  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, err);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page non trouvée</h1>');
  }
};

const server = http.createServer(async (req, res) => {
  const pathname = req.url.split('?')[0]; // Récupérer le chemin sans les paramètres de requête
  const filePath = join(frontendDir, pathname === '/' ? 'index.html' : pathname); // Par défaut, servir index.html pour "/"

  await serveStaticFile(filePath, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur en route : http://localhost:${PORT}`);
});