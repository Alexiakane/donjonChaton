import db from '../../config/database.js';
import { Meowgic } from '../models/Meowgic.js';
import { CharacterFullMeowgic } from '../models/CharacterFullMeowgic.js';
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

export const meowgicRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Meowgic"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Meowgic(
            row.id_meowgic,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Meowgic" WHERE ID_Meowgic = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Meowgic(
                row.id_meowgic,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async getByCharacterId(characterId) {
        const query = 'SELECT m.* FROM "Character_Meowgic" cm'
        + ' INNER JOIN "Meowgic" m ON cm.ID_Meowgic = m.ID_Meowgic'
        + ' WHERE cm.ID_Character = $1';
        const result = await dbQuery(query, [characterId]);
        return result.rows.map(row => new CharacterFullMeowgic(
            row.id_meowgic,
            row.name
        ));
    },

    async create(meowgic) {
        const query = `INSERT INTO "Meowgic" (Name, Description) VALUES ($1, $2) RETURNING ID_Meowgic`;
        const params = [meowgic.name, meowgic.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_meowgic;
    },

    async update(id, meowgic) {
        const query = `UPDATE "Meowgic" SET Name = $1, Description = $2 WHERE ID_Meowgic = $3 RETURNING ID_Meowgic`;
        const params = [meowgic.name, meowgic.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Meowgic" WHERE ID_Meowgic = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Miagie non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};