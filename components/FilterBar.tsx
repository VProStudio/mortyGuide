import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';
import { CustomPicker } from '@/components/CustomPicker';
import type { Filter } from '@/utils/types';
import React from 'react';

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

    const statusItems = [
        { label: "Alive", value: "Alive" },
        { label: "Dead", value: "Dead" },
        { label: "Unknown", value: "unknown" }
    ];

    const speciesItems = [
        { label: "Alien", value: "Alien" },
        { label: "Human", value: "Human" }
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <CustomPicker
                label="Status"
                value={filters.status}
                onValueChange={handleChangeStatus}
                items={statusItems}
            />
            <CustomPicker
                label="Species"
                value={filters.species}
                onValueChange={handleChangeSpecies}
                items={speciesItems}
            />
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
    }
});
