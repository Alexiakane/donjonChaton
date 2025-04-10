import db from '../../config/database.js';
import { Childhood } from '../models/Childhood.js';
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

export const childhoodRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Childhood"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Childhood(
            row.id_childhood,
            row.name,
            row.description,
            row.gift,
            row.gift_description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Childhood" WHERE ID_Childhood = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Childhood(
                row.id_childhood,
                row.name,
                row.description,
                row.gift,
                row.gift_description
            );
        } else {
            return null;
        }
    },

    async create(childhood) {
        const query = `INSERT INTO "Childhood" (Name, Description, Gift, Gift_description) VALUES ($1, $2, $3, $4) RETURNING ID_Childhood`;
        const params = [childhood.name, childhood.description, childhood.gift, childhood.gift_description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_childhood;
    },

    async update(id, childhood) {
        const query = `UPDATE "Childhood" SET Name = $1, Description = $2, Gift = $3, Gift_Description = $4 WHERE ID_Childhood = $3 RETURNING ID_Childhood`;
        const params = [childhood.name, childhood.description, childhood.gift, childhood.gift_description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Childhood" WHERE ID_Childhood = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Enfance non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};
