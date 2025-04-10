import db from '../../config/database.js';
import { Talent } from '../models/Talent.js';
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

export const talentRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Talent"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Talent(
            row.id_talent,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Talent" WHERE ID_Talent = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Talent(
                row.id_talent,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async getByCharacterId(characterId) {
            const query = 'SELECT t.* FROM "Character_Talent" ct'
            + ' INNER JOIN "Talent" t ON ct.ID_Talent = t.ID_Talent'
            + ' WHERE ct.ID_Character = $1';
            const result = await dbQuery(query, [characterId]);
            return result.rows.map(row => new Talent(
                row.id_talent,
                row.name,
                row.description
            ));
        },

    async create(talent) {
        const query = `INSERT INTO "Talent" (Name, Description) VALUES ($1, $2) RETURNING ID_Talent`;
        const params = [talent.name, talent.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_talent;
    },

    async update(id, talent) {
        const query = `UPDATE "Talent" SET Name = $1, Description = $2 WHERE ID_Talent = $3 RETURNING *`;
        const params = [talent.name, talent.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Talent" WHERE ID_Talent = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Talent non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};