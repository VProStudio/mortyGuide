// Hook for managing offline data caching and retrieval from local database
import {
  getCharactersFromDB,
  initDatabase,
  saveCharactersToDB,
} from '@/services/database';
import { useState, useEffect, useRef } from 'react';
import { isWeb } from '@/utils/platform';
import type { Character } from '@/utils/types';

export const useOfflineData = (
  isConnected: boolean,
  onlineData: Character[],
) => {
  const [offlineData, setOfflineData] = useState<Character[]>([]);
  const [offlineLoading, setOfflineLoading] = useState(true);
  const [offlineError, setOfflineError] = useState<string | null>(null);
  const lastSaveTimeRef = useRef(0);

  // Initialize database tables on first app launch (mobile only)
  useEffect(() => {
    // Skip database operations on web platform
    if (!isWeb) {
      initDatabase().catch((err) =>
        console.error('Error initializing database:', err),
      );
    }
  }, []);

  // Throttled saving: cache online data with 5-second frequency limit
  useEffect(() => {
    if (!isWeb && isConnected && onlineData.length > 0) {
      const now = Date.now();
      if (now - lastSaveTimeRef.current > 5000) {
        lastSaveTimeRef.current = now;
        saveCharactersToDB(onlineData).catch((err) =>
          console.error('Error saving characters to DB:', err),
        );
      }
    }
  }, [isConnected, onlineData]);

  // Load cached data from database when offline
  useEffect(() => {
    const loadOfflineData = async () => {
      setOfflineLoading(true);
      setOfflineError(null);
      try {
        if (!isWeb) {
          const offlineCharacters = await getCharactersFromDB();
          setOfflineData(offlineCharacters);
        } else {
          setOfflineData([]);
        }
      } catch (err) {
        console.error('Error loading offline data:', err);
        setOfflineError('Failed to load saved data');
      } finally {
        setOfflineLoading(false);
      }
    };

    if (!isConnected) {
      loadOfflineData();
    }
  }, [isConnected]);

  return {
    offlineData,
    offlineLoading,
    offlineError,
    resetOfflineError: () => setOfflineError(null),
  };
};
