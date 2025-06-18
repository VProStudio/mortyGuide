import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected };
};
