import db from '../../config/database.js';
import { Gift } from '../models/Gift.js';
import { logError } from '../utils/logger.js';

async function dbQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

export const giftRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Gift"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Gift(
            row.id_gift,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Gift" WHERE ID_Gift = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Gift(
                row.id_gift,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async create(gift) {
        const query = `INSERT INTO "Gift" (Name, Description) VALUES ($1, $2) RETURNING ID_Gift`;
        const params = [gift.name, gift.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_gift;
    },

    async update(id, gift) {
        const query = `UPDATE "Gift" SET Name = $1, Description = $2 WHERE ID_Gift = $3 RETURNING ID_Gift`;
        const params = [gift.name, gift.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Gift" WHERE ID_Gift = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Don non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};

