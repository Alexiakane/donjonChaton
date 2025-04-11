import db from '../../config/database.js';
import { Equipment } from '../models/Equipment.js';
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

export const equipmentRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Equipment" ORDER BY ID_Equipment';
        const result = await dbQuery(query);
        return result.rows.map(row => new Equipment(
            row.id_equipment,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Equipment" WHERE ID_Equipment = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Equipment(
                row.id_equipment,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async getByCharacterId(characterId) {
        const query = 'SELECT e.* FROM "Character_Equipment" ce'
            + ' INNER JOIN "Equipment" e ON ce.ID_Equipment = e.ID_Equipment'
            + ' WHERE ce.ID_Character = $1'
            + ' ORDER BY e.ID_Equipment';
        const result = await dbQuery(query, [characterId]);
        return result.rows.map(row => new Equipment(
            row.id_equipment,
            row.name,
            row.description
        ));
    },

    async create(equipment) {
        const query = `INSERT INTO "Equipment" (Name, Description) VALUES ($1, $2) RETURNING ID_Equipment`;
        const params = [equipment.name, equipment.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_equipment;
    },

    async update(id, equipment) {
        const query = `UPDATE "Equipment" SET Name = $1, Description = $2 WHERE ID_Equipment = $3 RETURNING *`;
        const params = [equipment.name, equipment.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Equipment" WHERE ID_Equipment = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Equipement non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};