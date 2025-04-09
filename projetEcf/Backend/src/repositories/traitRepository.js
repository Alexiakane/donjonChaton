import db from '../../config/database.js';
import { Trait } from '../models/Trait.js';
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

export const traitRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Trait"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Trait(
            row.id_trait,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Trait" WHERE ID_Trait = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Trait(
                row.id_trait,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async create(trait) {
        const query = `INSERT INTO "Trait" (Name, Description) VALUES ($1, $2) RETURNING ID_Trait`;
        const params = [trait.name, trait.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_trait;
    },

    async update(id, trait) {
        const query = `UPDATE "Trait" SET Name = $1, Description = $2 WHERE ID_Trait = $3 RETURNING ID_Trait`;
        const params = [trait.name, trait.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Trait" WHERE ID_Trait = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Trait non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};