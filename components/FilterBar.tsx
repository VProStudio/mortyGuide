import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemeContext } from '@/theme/ThemeContext';
import type { Filter } from '@/utils/types';

type FilterBarProps = {
    filters: Filter;
    onChange: (filter: Partial<Filter>) => void;
    disabled?: boolean;
};

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
    const { colors } = React.useContext(ThemeContext);

    const handleChangeStatus = (status: string) => {
        onChange({ ...filters, status: status as Filter['status'] });
    };

    const handleChangeSpecies = (species: string) => {
        onChange({ ...filters, species: species as Filter['species'] });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={styles.filterGroup}>
                <Text style={{ color: colors.text }}>Status</Text>
                <Picker
                    selectedValue={filters.status}
                    onValueChange={handleChangeStatus}
                    style={[styles.picker, { color: colors.text }]}
                >
                    <Picker.Item label="All" value="" />
                    <Picker.Item label="Alive" value="Alive" />
                    <Picker.Item label="Dead" value="Dead" />
                    <Picker.Item label="Unknown" value="unknown" />
                </Picker>
            </View>

            <View style={styles.filterGroup}>
                <Text style={{ color: colors.text }}>Species</Text>
                <Picker
                    selectedValue={filters.species}
                    onValueChange={handleChangeSpecies}
                    style={[styles.picker, { color: colors.text }]}
                >
                    <Picker.Item label="All" value="" />
                    <Picker.Item label="Alien" value="Alien" />
                    <Picker.Item label="Human" value="Human" />
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8,
        marginBottom: 8,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 65,
        gap: 10
    },
    filterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 200,
    },
    picker: {
        height: 50,
        width: 120,
        marginHorizontal: 4,
    },
});