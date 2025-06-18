import { StyleSheet } from 'react-native';
import { CharacterStatus } from '@/utils/constants';


export const colors = {
    light: {
        background: '#f3f5e1',
        text: '#000000',
        card: '#dddecc',
        header: '#dddecc',
        tabBar: '#E1E8D5',
        tabBarLabel: '#000000',
        pickerOption: '#9c9d90',
        status: {
            alive: '#55CC44',
            dead: '#D63D2E',
            unknown: '#9E9E9E'
        }
    },
    dark: {
        background: '#010f1c',
        text: '#FFFFFF',
        card: '#011527',
        header: '#011527',
        tabBar: '#011527',
        tabBarLabel: '#FFFFFF',
        pickerOption: '#021e37',
        status: {
            alive: '#8cc683',
            dead: '#FF6B6B',
            unknown: '#BDBDBD'
        }
    }
};

export const getStatusStyle = (status: string, theme: 'light' | 'dark') => {
    let color;
    const themeColors = theme === 'dark' ? colors.dark : colors.light;

    switch (status.toLowerCase()) {
        case CharacterStatus.ALIVE.toLowerCase():
            color = themeColors.status.alive;
            break;
        case CharacterStatus.DEAD.toLowerCase():
            color = themeColors.status.dead;
            break;
        default:
            color = themeColors.status.unknown;
            break;
    }

    const borderColor = color;
    const shadowColor = color;

    return {
        borderColor,
        shadowColor,
        elevation: 10,
        borderWidth: 2,
    };
};

export const cardStyles = StyleSheet.create({

    detailInfoContainer: {
        flex: 1,
        padding: 16,
        marginHorizontal: 5,
        borderRadius: 8,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardInfoContainer: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        margin: 8,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
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
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 8,
        paddingLeft: 40
    },
    label: {
        fontWeight: '500',
        marginRight: 8,
        fontSize: 17,
        width: 80,
    },
    imageMain:
    {
        width: 150,
        height: 150,
        borderRadius: 5,
        borderWidth: 1,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    value: {
        fontFamily: 'CustomFont',
        fontWeight: '500',
        marginRight: 8,
        fontSize: 19,
    },
    created: {
        fontSize: 12,
        marginTop: 16,
        textAlign: 'right',
    },
    filterLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    }

});

