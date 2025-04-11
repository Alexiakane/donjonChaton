import db from '../../config/database.js';
import { Role } from '../models/Role.js';
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

export const roleRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Role" ORDER BY ID_Role';
        const result = await dbQuery(query);
        return result.rows.map(row => new Role(
            row.id_role,
            row.name,
            row.description
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "Role" WHERE ID_Role = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new Role(
                row.id_role,
                row.name,
                row.description
            );
        } else {
            return null;
        }
    },

    async create(role) {
        const query = `INSERT INTO "Role" (Name, Description) VALUES ($1, $2) RETURNING ID_Role`;
        const params = [role.name, role.description];
        const result = await dbQuery(query, params);
        return result.rows[0].id_role;
    },

    async update(id, role) {
        const query = `UPDATE "Role" SET Name = $1, Description = $2 WHERE ID_Role = $3 RETURNING *`;
        const params = [role.name, role.description, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Role" WHERE ID_Role = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Rôle non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};