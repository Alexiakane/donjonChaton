import db from "../../config/database.js";
import { Quality } from "../models/Quality.js";
import { logError } from "../utils/logger.js";

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

export const qualityRepository = {
    async getAll() {
        const query = 'SELECT * FROM "Quality"';
        const result = await dbQuery(query);
        return result.rows.map(row => new Quality(
            row.id_quality,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Quality" WHERE ID_Quality = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Quality(
                row.id_quality,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async create(quality) {
        const query = `INSERT INTO "Quality" (Name, Description) VALUES ($1, $2) RETURNING ID_Quality`;
        const params = [quality.name, quality.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_quality;
    },

    async update(id, quality) {
        const query = `UPDATE "Quality" SET Name = $1, Description = $2 WHERE ID_Quality = $3 RETURNING *`;
        const params = [quality.name, quality.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Quality" WHERE ID_Quality = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Qualité non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};