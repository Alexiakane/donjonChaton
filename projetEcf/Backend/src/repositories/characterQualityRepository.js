import db from '../../config/database.js';
import { CharacterQuality } from '../models/CharacterQuality.js';
import { CharacterFullQuality } from '../models/CharacterFullQuality.js';
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

export const characterQualityRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Character_Quality" ORDER BY ID_Character, ID_Quality';
        const result = await dbQuery(query);
        return result.rows.map(row => new CharacterQuality(
            row.id_character,
            row.id_quality,
            row.level
        ));
    },

    async get(characterId, qualityId) {
        const query = 'SELECT * FROM "Character_Quality" WHERE ID_Character = $1 AND ID_Quality = $2';
        const result = await dbQuery(query, [characterId, qualityId]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new CharacterQuality(
                row.id_character,
                row.id_quality,
                row.level
            );
        } else {
            return null;
        }
    },

    async getByCharacterId(characterId) {
        const query = 'SELECT cq.*, q.name FROM "Character_Quality" cq'
        + ' INNER JOIN "Quality" q ON cq.ID_Quality = q.ID_Quality'
        + ' WHERE cq.ID_Character = $1';
        const result = await dbQuery(query, [characterId]);
        return result.rows.map(row => new CharacterFullQuality(
            row.id_quality,
            row.name,
            row.level
        ));
    },

    async create(characterQuality) {
        const query = `INSERT INTO "Character_Quality" (ID_Character, Id_Quality, level) VALUES ($1, $2, $3) RETURNING ID_Character, ID_Quality`;
        const params = [characterQuality.idCharacter, characterQuality.idQuality, characterQuality.level];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async update(characterId, qualityId, characterQuality) {
        const query = `UPDATE "Character_Quality" SET Level = $1 WHERE  ID_Character = $2 AND ID_Quality = $3 RETURNING *`;
        const params = [characterQuality.level, characterId, qualityId];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(characterId, qualityId) {
        const query = `DELETE FROM "Character_Quality" WHERE ID_Character = $1 AND ID_Quality = $2`;
        const result = await dbQuery(query, [characterId, qualityId]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Lien personnage et qualité non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};