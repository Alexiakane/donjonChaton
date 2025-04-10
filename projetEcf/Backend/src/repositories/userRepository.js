import db from '../../config/database.js';
import { User } from '../models/User.js';
import { logError } from '../utils/logger.js';
import bcrypt from 'bcryptjs';

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

export const userRepository = {


    async getAll() {
        const query = 'SELECT * FROM "User"';
        const result = await dbQuery(query);
        return result.rows.map(row => new User(
            row.id_user,
            row.fullname,
            row.username,
            row.password,
            row.email,
            row.avatar,
            row.id_role
        ));
    },

    async get(id) {
        const query = 'SELECT * FROM "User" WHERE ID_User = $1';
        const result = await dbQuery(query, [id]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new User(
                row.id_user,
                row.fullname,
                row.username,
                row.email,
                row.password,
                row.avatar,
                row.id_role
            );
        } else {
            return null;
        }
    },

    async create(user) {
        const query = `INSERT INTO "User" (Fullname, Username, Password, Email, ID_Role) VALUES ($1, $2, $3, $4, $5) RETURNING ID_User`;
        const params = [user.fullname, user.username, user.password, user.email, user.idRole];
        const result = await dbQuery(query, params);
        return result.rows[0].id_user;
    },

    async update(id, user) {
        const query = `UPDATE "User" SET Username = $1, Password = $2, Email = $3, ID_Role = $4 WHERE ID_User = $5 RETURNING *`;
        const params = [user.fullname, user.username, user.password, user.email, user.idRole, id];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "User" WHERE ID_User = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Utilisateur non trouvé');
            return -1;
        }
        return result.rowCount;
    },

    async findByUsername(username) {
        const query = 'SELECT * FROM "User" WHERE Username = $1';
        const result = await dbQuery(query, [username]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new User(
                row.id_user,
                row.fullname,
                row.username,
                row.email,
                row.password,
                row.avatar,
                row.id_role
            );
        } else {
            return null;
        }
    },

    async findByEmail(email) {
        const query = 'SELECT * FROM "User" WHERE Email = $1';
        const result = await dbQuery(query, [email]);
        if (result.rows.length > 0) {
            const row = result.rows[0];
            return new User(
                row.id_user,
                row.fullname,
                row.username,
                row.email,
                row.password,
                row.avatar,
                row.id_role
            );
        } else {
            return null;
        }
    }
};
