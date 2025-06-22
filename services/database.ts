// SQLite database service for offline character data caching with web platform compatibility
import { openDatabaseSync } from 'expo-sqlite';
import { isWeb } from '@/utils/platform';
import type { Character } from '@/utils/types';

// Initialize SQLite database for mobile platforms, null for web (SQLite not supported)
const db = isWeb ? null : openDatabaseSync('RickAndMorty.db');

const MAX_CACHED_CHARACTERS = 20;

type DbCharacter = Character & { id: number };

interface DbRow {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

// Generic wrapper for database operations with web compatibility and error handling
const executeDbOperation = async <T>(
  operation: () => Promise<T>,
  errorMessage: string,
  defaultValue: T,
): Promise<T> => {
  // Check if database is properly initialized
  if (!db) {
    console.error('Database is not initialized');
    return defaultValue;
  }

  // Skip database operations on web platform and return default value
  if (isWeb) {
    console.warn('SQLite is not supported in the web version');
    return defaultValue;
  }

  // Execute database operation with centralized error logging
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
    undefined,
  );
};

export const clearCharacters = async (): Promise<void> => {
  return executeDbOperation(
    async () => {
      // Clear existing data before saving new characters (replace strategy)
      await db!.runAsync('DELETE FROM characters;');
    },
    'Error clearing table',
    undefined,
  );
};

export const saveCharactersToDB = async (
  characters: DbCharacter[],
): Promise<void> => {
  return executeDbOperation(
    async () => {
      await initDatabase();
      await db!.runAsync('DELETE FROM characters;');

      // Limit cached characters to prevent excessive storage usage
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
          ],
        );
      }
    },
    'Error saving characters',
    undefined,
  );
};

export const getCharactersFromDB = async (): Promise<Character[]> => {
  return executeDbOperation(
    async () => {
      const result = await db!.getAllAsync<DbRow>(
        'SELECT * FROM characters ORDER BY id ASC LIMIT 20;',
      );

      // Transform database rows to full Character objects with default values for missing fields
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
    [],
  );
};
