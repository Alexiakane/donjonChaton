import db from '../../config/database.js';
import { Character } from '../models/Character.js';

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
            row.ID_Gift,
            row.ID_Trait,
            row.ID_User,
            row.Story,
            row.Portrait,
            row.Xp
        ));
    },

    async getFull(id) {
        const query = 'SELECT * FROM Character WHERE ID_Character = ?';
        const results = await dbQuery(query, [id]);
        if (results.length > 0) {
            const row = results[0];
            return new Character(
                row.ID_Character,
                row.Name,
                row.Heart_Points,
                row.Friendship_Points,
                row.ID_Childhood,
                row.ID_Gift,
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

    async get(id) {
        const query = 'SELECT * FROM Character WHERE ID_Character = ?';
        const results = await dbQuery(query, [id]);
        if (results.length > 0) {
            const row = results[0];
            return new Character(
                row.ID_Character,
                row.Name,
                row.Heart_Points,
                row.Friendship_Points,
                row.ID_Childhood,
                row.ID_Gift,
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
        const query = `INSERT INTO Character (Name, Heart_Points, Friendship_Points, ID_Childhood, ID_Gift, ID_Trait, ID_User, Story, Portrait, Xp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            character.name,
            character.heartPoints,
            character.friendshipPoints,
            character.idChildhood,
            character.idGift,
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
        const query = `UPDATE Character SET Name = ?, Heart_Points = ?, Friendship_Points = ?, ID_Childhood = ?, ID_Gift = ?, ID_Trait = ?, ID_User = ?, Story = ?, Portrait = ?, Xp = ? WHERE ID_Character = ?`;
        const params = [
            character.name,
            character.heartPoints,
            character.friendshipPoints,
            character.idChildhood,
            character.idGift,
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
        const query = `DELETE FROM Character WHERE ID_Character = ?`;
        await dbQuery(query, [id]);
        if (result.rowCount === 0) {
            logError('Erreur de suppression : Personnage non trouvé');
            return -1;
        }
        return result.rowCount;
    }
};