import { test, expect } from 'vitest';
import { traitRepository } from "../../src/repositories/traitRepository.js";
import { Trait } from "../../src/models/Trait.js";

test ('traitRepository.getAll() should return an array of traits', async () => {
    const traits = await traitRepository.getAll();
    expect(traits).toBeInstanceOf(Array);
    expect(traits.length).toBeGreaterThan(0);
    expect(traits[0]).toBeInstanceOf(Trait);
})

test ('traitRepository.get(id) should return a trait object', async () => {
    const trait = await traitRepository.get(1);
    expect(trait).toBeInstanceOf(Trait);
    expect(trait.id).toBe(1);
})

test ('traitRepository.get(id) should return null for non-existing trait', async () => {
    const trait = await traitRepository.get(9999); // Assuming 9999 does not exist
    expect(trait).toBeNull();
})

/*
test ('traitRepository.create(trait) should create a new trait', async () => {
    let newtrait = new trait(null, 'New trait', 'Description of new trait');
    const createdtraitId = await traitRepository.create(newtrait);
    expect(createdtraitId).toBeDefined();
    expect(typeof createdtraitId).toBe('number');
})

test ('traitRepository.update(id, trait) should update an existing trait', async () => {
    const updatedtrait = new trait(1, 'Updated trait', 'Updated description');
    const result = await traitRepository.update(1, updatedtrait);
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the update returns true on success
})

test ('traitRepository.delete(id) should delete an existing trait', async () => {
    const result = await traitRepository.delete(1); // Assuming 1 exists
    expect(result).toBeDefined();
    expect(result).toBe(true); // Assuming the delete returns true on success
})

test ('traitRepository.delete(id) should return false for non-existing trait', async () => {
    const result = await traitRepository.delete(9999); // Assuming 9999 does not exist
    expect(result).toBeDefined();
    expect(result).toBe(false); // Assuming the delete returns false on failure
})
*/
