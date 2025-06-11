import * as SQLite from 'expo-sqlite';
import type { Character } from '@/utils/types';

const db = SQLite.openDatabaseSync('RickAndMorty.db');

type DbCharacter = Character & { id: number };

const MAX_CACHED_CHARACTERS = 30;

export const initDatabase = async (): Promise<void> => {
    try {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY,
        name TEXT,
        status TEXT,
        species TEXT,
        image TEXT
      );
    `);
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
};

export const clearCharacters = async (): Promise<void> => {
    try {
        await db.runAsync('DELETE FROM characters;');
    } catch (error) {
        console.error('Error clearing table:', error);
        throw error;
    }
};

export const saveCharactersToDB = async (characters: DbCharacter[]): Promise<void> => {
    await clearCharacters();
    const charactersToSave = characters.slice(0, MAX_CACHED_CHARACTERS);

    if (charactersToSave.length === 0) return;

    try {
        await db.withTransactionAsync(async () => {
            for (const character of charactersToSave) {
                await db.runAsync(
                    'INSERT INTO characters (id, name, status, species, image) VALUES (?, ?, ?, ?, ?);',
                    [character.id, character.name, character.status, character.species, character.image]
                );
            }
        });
    } catch (error) {
        console.error('Error saving characters:', error);
        throw error;
    }
};

export const getCharactersFromDB = async (): Promise<DbCharacter[]> => {
    try {
        const result = await db.getAllAsync<DbCharacter>(
            'SELECT * FROM characters ORDER BY id DESC LIMIT 20;'
        );
        return result;
    } catch (error) {
        console.error('Error retrieving characters:', error);
        throw error;
    }
};