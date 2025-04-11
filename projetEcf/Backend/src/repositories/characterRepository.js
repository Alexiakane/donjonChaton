import db from '../../config/database.js';
import { Character } from '../models/Character.js';
import { CharacterFull } from '../models/CharacterFull.js';
import { Childhood } from '../models/Childhood.js';
import { Trait } from '../models/Trait.js';

async function dbQuery(query, params) {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const characterRepository = {

    async getAll() {
        const query = 'SELECT * FROM "Character" ORDER BY ID_Character';
        const results = await dbQuery(query);
        return results.rows.map(row => new Character(
            row.id_character,
                row.name,
                row.heart_points,
                row.friendship_points,
                row.id_childhood,
                row.id_trait,
                row.id_user,
                row.story,
                row.portrait,
                row.xp
        ));
    },

    async getsByUserId(idUser) {
        const query = 'SELECT * FROM "Character" WHERE ID_User = $1';
        const results = await dbQuery(query, [idUser]);
        return results.rows.map(row => new Character(
            row.id_character,
                row.name,
                row.heart_points,
                row.friendship_points,
                row.id_childhood,
                row.id_trait,
                row.id_user,
                row.story,
                row.portrait,
                row.xp
        ));
    },

    async getFull(id) {
        const query = 'SELECT cha.*,'
        + ' chi.name as chiname, chi.description as chidescr, chi.gift as chigift, chi.gift_description as chigiftdesc,'
        + ' t.name as traitname, t.description as traitdescr'
        + ' FROM "Character" cha'
        + ' INNER JOIN "Childhood" chi ON chi.ID_Childhood = cha.ID_Childhood'
        + ' INNER JOIN "Trait" t ON t.ID_Trait = cha.ID_Trait'
        + ' WHERE cha.ID_Character = $1';
        const results = await dbQuery(query, [id]);
        if (results.rows.length > 0) {
            const row = results.rows[0];
            const childhood = new Childhood(row.id_childhood, row.chiname, row.chidescr, row.chigift, row.chigiftdesc);
            const trait = new Trait(row.id_trait, row.traitname, row.traitdescr);
            return new CharacterFull(
                row.id_character,
                row.name,
                row.heart_points,
                row.friendship_points,
                childhood,
                trait,
                row.id_user,
                row.story,
                row.portrait,
                row.xp
            );
        } else {
            return null;
        }
    },

    async get(id) {
        const query = 'SELECT * FROM "Character" WHERE ID_Character = $1';
        const results = await dbQuery(query, [id]);
        if (results.rows.length > 0) {
            const row = results.rows[0];
            return new Character(
                row.id_character,
                row.name,
                row.heart_points,
                row.friendship_points,
                row.id_childhood,
                row.id_trait,
                row.id_user,
                row.story,
                row.portrait,
                row.xp
            );
        } else {
            return null;
        }
    },

    async create(character) {
        const query = `INSERT INTO "Character" (Name, Heart_Points, Friendship_Points, ID_Childhood, ID_Trait, ID_User, Story, Portrait, Xp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ID_Character`;
        const params = [
            character.name,
            character.heartPoints,
            character.friendshipPoints,
            character.idChildhood,
            character.idTrait,
            character.idUser,
            character.story,
            character.portrait,
            character.xp
        ];
        const result = await dbQuery(query, params);
        return result.rows[0].id_character;
    },

    async update(id, character) {
        const query = `UPDATE "Character" SET Name = $1, Heart_Points = $2, Friendship_Points = $3, ID_Childhood = $4, ID_Trait = $5, ID_User = $6, Story = $7, Portrait = $8, Xp = $9 WHERE ID_Character = $10 RETURNING *`;
        const params = [
            character.name,
            character.heartPoints,
            character.friendshipPoints,
            character.idChildhood,
            character.idTrait,
            character.idUser,
            character.story,
            character.portrait,
            character.xp,
            id
        ];
        const result = await dbQuery(query, params);
        return result.rows[0];
    },

    async delete(id) {
        const query = `DELETE FROM "Character" WHERE ID_Character = $1`;
        const result = await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Personnage non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};