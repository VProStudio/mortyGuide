// Filter bar component with status and species pickers for character filtering
import { STATUS_OPTIONS, SPECIES_OPTIONS } from '@/utils/constants';
import { CustomPicker } from '@/components/CustomPicker';
import { useTheme } from '@/hooks/useTheme';
import { View, StyleSheet } from 'react-native';
import React from 'react';
import type { Filter } from '@/utils/types';

type FilterBarProps = {
  filters: Filter;
  onChange: (filter: Partial<Filter>) => void;
  disabled?: boolean;
};

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onChange }) => {
  const { colors } = useTheme();

  // Separate handlers for each filter type to maintain clarity and allow future customization
  const handleChangeStatus = (status: string) => {
    onChange({ ...filters, status: status as Filter['status'] });
  };

  const handleChangeSpecies = (species: string) => {
    onChange({ ...filters, species: species as Filter['species'] });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.headerBottomBorder,
        },
      ]}
    >
      <CustomPicker
        label="Status"
        value={filters.status}
        onValueChange={handleChangeStatus}
        items={STATUS_OPTIONS}
      />
      <CustomPicker
        label="Species"
        value={filters.species}
        onValueChange={handleChangeSpecies}
        items={SPECIES_OPTIONS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    height: 65,
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
    padding: 16,
    width: '100%',
  },
});
