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

    async getFull(id) {
        const characterFull = await characterRepository.getFull(id);
        //appel pour lister les qualites
        const characterQualities = await characterQualityService.getByCharacterId(id);
        characterFull.qualities = characterQualities;
        //appel pour lister les equipements
        const characterEquipments = await equipmentService.getEquipmentsByCharacterId(id);
        characterFull.equipments = characterEquipments;
        //appel pour lister les meowgics
        const characterMeowgics = await meowgicService.getMeowgicsByCharacterId(id);
        characterFull.meowgics = characterMeowgics;
        //appel pour lister les talents
        const characterTalents = await talentService.getTalentsByCharacterId(id);
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

    async update(id, characterData) {
        const character = new Character(characterData);
        return await characterRepository.update(id, character);
    },

    async delete(id) {
        return await characterRepository.delete(id);
    }
};