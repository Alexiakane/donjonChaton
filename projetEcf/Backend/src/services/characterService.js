import { characterRepository } from '../repositories/characterRepository.js';
import { Character } from '../models/Character.js';
import { characterQualityService } from './characterQualityService.js';
import { equipmentService } from './equipmentService.js';
import { meowgicService } from './meowgicService.js';
import { talentService } from './talentService.js';
import { logError } from '../utils/logger.js';

export const characterService = {

    async getAll() {
        return await characterRepository.getAll();
    },

    async getsByUserId(idUser) {
        return await characterRepository.getsByUserId(idUser);
    },

    async getFull(id) {
        const characterFull = await characterRepository.getFull(id);
        //appel pour lister les qualites
        const characterQualities = await characterQualityService.getByCharacterId(id);
        characterFull.qualities = characterQualities;
        //appel pour lister les equipements
        const characterEquipments = await equipmentService.getByCharacterId(id);
        characterFull.equipments = characterEquipments;
        //appel pour lister les meowgics
        const characterMeowgics = await meowgicService.getByCharacterId(id);
        characterFull.meowgics = characterMeowgics;
        //appel pour lister les talents
        const characterTalents = await talentService.getByCharacterId(id);
        characterFull.talents = characterTalents;

        return characterFull;
    },

    async get(id) {
        return await characterRepository.get(id);
    },

    async create(characterData) {
        let newcharacter = new Character(
            null,
            characterData.name,
            characterData.heartPoints,
            characterData.friendshipPoints,
            characterData.idChildhood,
            characterData.idTrait,
            characterData.idUser,
            characterData.story,
            characterData.portrait,
            characterData.xp
        );

        const validation = newcharacter.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }
        return await characterRepository.create(newcharacter);
    },

    async createFull(characterData) {
        let result;
        let newcharacter = new Character(
            null,
            characterData.name,
            characterData.heartPoints,
            characterData.friendshipPoints,
            characterData.idChildhood,
            characterData.idTrait,
            characterData.idUser,
            characterData.story,
            characterData.portrait,
            characterData.xp
        );

        const validation = newcharacter.estValide();
        if (!validation.valide) {
            logError(new Error(validation.erreur));
            throw new Error(validation.erreur);
        }
        result = await characterRepository.create(newcharacter);

        //appel pour creer les liens de qualites
        await characterRepository.createQualityLink(result, characterData.qualities);
        //appel pour creer les liens de equipements
        await characterRepository.createEquipmentLink(result, characterData.equipments);
        //appel pour creer les liens de meowgics
        await characterRepository.createMeowgicLink(result, characterData.meowgics);
        //appel pour creer les liens de talents
        await characterRepository.createTalentLink(result, characterData.talents);

        return result;
    },

    async update(id, characterData) {
        return await characterRepository.update(id, characterData);
    },

    async delete(id) {
        return await characterRepository.delete(id);
    },

    async deleteFull(id) {
        
        //appel pour supprimer les liens de qualites
        await characterRepository.deleteQualityLink(id);
        //appel pour supprimer les liens de equipements
        await characterRepository.deleteEquipmentLink(id);
        //appel pour supprimer les liens de meowgics
        await characterRepository.deleteMeowgicLink(id);
        //appel pour supprimer les liens de talents
        await characterRepository.deleteTalentLink(id);

        //supprime le personnage
        return await characterRepository.delete(id);
    }
};