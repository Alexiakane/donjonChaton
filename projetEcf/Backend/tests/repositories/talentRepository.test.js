import { test, expect } from 'vitest';
import { talentRepository } from "../../src/repositories/talentRepository";
import { Talent } from "../../src/models/Talent.js";

test ('talentRepository.getAll() should return an array of talents', async () => {
    const talents = await talentRepository.getAll();
    expect(talents).toBeInstanceOf(Array);
    expect(talents.length).toBeGreaterThan(0);
    expect(talents[0]).toBeInstanceOf(Talent);
})

test ('talentRepository.get(id) should return a talent object', async () => {
    const talent = await talentRepository.get(1);
    expect(talent).toBeInstanceOf(Talent);
    expect(talent.id).toBe(1);
})

test ('talentRepository.get(id) should return null for non-existing talent', async () => {
    const talent = await talentRepository.get(9999); // Assuming 9999 does not exist
    expect(talent).toBeNull();
})

test ('talentRepository.create(talent) should create a new talent', async () => {
    const newTalent = new Talent(null, 'New Talent', 'Description of new talent');
    const createdTalentId = await talentRepository.create(newTalent);
    expect(createdTalentId).toBeDefined();
    expect(typeof createdTalentId).toBe('number');
})

test ('talentRepository.update(id, talent) should update an existing talent', async () => {
    const updatedTalent = new Talent(1, 'Updated Talent', 'Updated description');
    const result = await talentRepository.update(1, updatedTalent);
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the update returns true on success
})

test ('talentRepository.delete(id) should delete an existing talent', async () => {
    const result = await talentRepository.delete(1); // Assuming 1 exists
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the delete returns true on success
})

test ('talentRepository.delete(id) should return false for non-existing talent', async () => {
    const result = await talentRepository.delete(9999); // Assuming 9999 does not exist
    expect(result).toBeDefined();
    expect(result).toBe(false); // Assuming the delete returns false on failure
})

test ('talentRepository.getByCharacterId(characterId) should return an array of talents for a character', async () => {
    const talents = await talentRepository.getByCharacterId(1); // Assuming 1 is a valid character ID
    expect(talents).toBeInstanceOf(Array);
    expect(talents.length).toBeGreaterThan(0);
    expect(talents[0]).toBeInstanceOf(Talent);
})

test ('talentRepository.getByCharacterId(characterId) should return an empty array for a character with no talents', async () => {
    const talents = await talentRepository.getByCharacterId(9999); // Assuming 9999 has no talents
    expect(talents).toBeInstanceOf(Array);
    expect(talents.length).toBe(0);
})