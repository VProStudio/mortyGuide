import { openDatabaseSync } from 'expo-sqlite';
import { isWeb } from '@/utils/platform';
import type { Character } from '@/utils/types';

const db = isWeb ? null : openDatabaseSync('RickAndMorty.db');

type DbCharacter = Character & { id: number };

const MAX_CACHED_CHARACTERS = 20;

interface DbRow {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

const executeDbOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string,
  defaultValue: T
): Promise<T> => {
  if (isWeb) {
    console.warn('SQLite is not supported in the web version');
    return defaultValue;
  }

  try {
    return await operation();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw error;
  }
};

export const initDatabase = async (): Promise<void> => {
  return executeDbOperation(
    async () => {
      await db!.execAsync(`
                CREATE TABLE IF NOT EXISTS characters (
                    id INTEGER PRIMARY KEY,
                    name TEXT,
                    status TEXT,
                    species TEXT,
                    image TEXT
                );
            `);
    },
    'Error creating table',
    undefined
  );
};

export const clearCharacters = async (): Promise<void> => {
  return executeDbOperation(
    async () => {
      await db!.runAsync('DELETE FROM characters;');
    },
    'Error clearing table',
    undefined
  );
};

export const saveCharactersToDB = async (
  characters: DbCharacter[]
): Promise<void> => {
  return executeDbOperation(
    async () => {
      await initDatabase();
      await db!.runAsync('DELETE FROM characters;');

      const charactersToSave = characters.slice(0, MAX_CACHED_CHARACTERS);
      if (charactersToSave.length === 0) return;

      for (const character of charactersToSave) {
        await db!.runAsync(
          'INSERT OR REPLACE INTO characters (id, name, status, species, image) VALUES (?, ?, ?, ?, ?);',
          [
            character.id,
            character.name,
            character.status,
            character.species,
            character.image,
          ]
        );
      }
    },
    'Error saving characters',
    undefined
  );
};

export const getCharactersFromDB = async (): Promise<Character[]> => {
  return executeDbOperation(
    async () => {
      const result = await db!.getAllAsync<DbRow>(
        'SELECT * FROM characters ORDER BY id ASC LIMIT 20;'
      );

      return result.map((row) => ({
        id: row.id,
        name: row.name,
        status: row.status,
        species: row.species,
        type: '',
        gender: '',
        origin: {
          name: 'Unknown',
          url: '',
        },
        location: {
          name: 'Unknown',
          url: '',
        },
        image: row.image,
        episode: [],
        url: '',
        created: new Date().toISOString(),
      }));
    },
    'Error retrieving characters',
    []
  );
};
