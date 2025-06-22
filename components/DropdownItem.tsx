// Individual dropdown item component with selection state and theme support
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';

type DropdownItemProps = {
  item: { label: string; value: string };
  isSelected: boolean;
  onPress: (value: string) => void;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  isSelected,
  onPress,
}) => {
  const { colors } = useTheme();

  const selectedItemStyle = {
    backgroundColor: colors.pickerOption,
    borderBottomColor: colors.pickerElemBorder,
  };

  return (
    <TouchableOpacity
      style={[styles.dropdownItem, isSelected && selectedItemStyle]}
      onPress={() => onPress(item.value)}
    >
      <Text style={{ color: colors.text }}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdownItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
  },
});
