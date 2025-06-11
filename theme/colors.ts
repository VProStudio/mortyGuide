import { StyleSheet } from 'react-native';

export const colors = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        card: '#F5F5F5',
    },
    dark: {
        background: '#121212',
        text: '#FFFFFF',
        card: '#1E1E1E',
    },
};

export const cardStyles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    id: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontWeight: '500',
        marginRight: 8,
        color: '#555',
        width: 80,
    },
    value: {
        color: '#333',
        flex: 1,
    },
    created: {
        fontSize: 12,
        color: '#999',
        marginTop: 16,
        textAlign: 'right',
    },
    container: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#ff6b6b'
    },

});