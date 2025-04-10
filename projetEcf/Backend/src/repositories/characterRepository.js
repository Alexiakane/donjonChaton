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
        const query = 'SELECT * FROM Character';
        const results = await dbQuery(query);
        return results.map(row => new Character(
            row.ID_Character,
            row.Name,
            row.Heart_Points,
            row.Friendship_Points,
            row.ID_Childhood,
            row.ID_Trait,
            row.ID_User,
            row.Story,
            row.Portrait,
            row.Xp
        ));
    },

    async getFull(id) {
        const query = 'SELECT cha.*,'
        + ' chi.name as chiname,'
        + ' t.name as traitname'
        + ' FROM "Character" cha'
        + ' INNER JOIN "Childhood" chi ON chi.ID_Childhood = cha.ID_Childhood'
        + ' INNER JOIN "Trait" t ON t.ID_Trait = cha.ID_Trait'
        + ' WHERE cha.ID_Character = $1';
        const results = await dbQuery(query, [id]);
        if (results.rows.length > 0) {
            const row = results.rows[0];
            const childhood = new Childhood(row.ID_Childhood, row.chiname);
            const trait = new Trait(row.ID_Trait, row.traitname);
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
        const query = 'SELECT * FROM Character WHERE ID_Character = $1';
        const results = await dbQuery(query, [id]);
        if (results.length > 0) {
            const row = results[0];
            return new Character(
                row.ID_Character,
                row.Name,
                row.Heart_Points,
                row.Friendship_Points,
                row.ID_Childhood,
                row.ID_Trait,
                row.ID_User,
                row.Story,
                row.Portrait,
                row.Xp
            );
        } else {
            return null;
        }
    },

    async create(character) {
        const query = `INSERT INTO "Character" (Name, Heart_Points, Friendship_Points, ID_Childhood, ID_Gift, ID_Trait, ID_User, Story, Portrait, Xp) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING ID_Character`;
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
        return result.insertId;
    },

    async update(id, character) {
        const query = `UPDATE Character SET Name = $1, Heart_Points = $2, Friendship_Points = $3, ID_Childhood = $4, ID_Gift = $5, ID_Trait = $6, ID_User = $7, Story = $8, Portrait = $9, Xp = $10 WHERE ID_Character = $11 RETURNING ID_Character`;
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
        await dbQuery(query, params);
    },

    async delete(id) {
        const query = `DELETE FROM Character WHERE ID_Character = $1`;
        await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Personnage non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};