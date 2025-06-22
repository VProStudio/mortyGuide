// Custom dropdown picker component for filtering with theme and responsive design support
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useResponsive } from '@/components/ResponsiveContext';
import { DropdownItem } from './DropdownItem';
import { useTheme } from '@/hooks/useTheme';
import React, { useState } from 'react';

type CustomPickerProps = {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
  placeholder?: { label: string; value: string };
};

export const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  value,
  onValueChange,
  items,
  placeholder = { label: 'All', value: '' },
}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { fonts } = useResponsive();

  // Find selected item by value or use placeholder if no selection
  const selectedItem = value
    ? items.find((item) => item.value === value)
    : placeholder;

  const pickerButtonStyle = [
    styles.pickerButton,
    {
      backgroundColor: colors.card,
      shadowColor: colors.text,
    },
  ];

  const responsivePicker = {
    basicText: {
      fontSize: fonts.card,
    },
    arrow: {
      right: fonts.arrow,
    },
  };

  // Handle item selection: update parent component and close dropdown
  const handleItemPress = (itemValue: string) => {
    onValueChange(itemValue);
    setIsOpen(false);
  };

  // Combine placeholder with filter items for dropdown rendering
  const allItems = [placeholder, ...items];

  return (
    <View style={styles.container}>
      {/* Conditionally render label if provided */}
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      <TouchableOpacity
        style={pickerButtonStyle}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[responsivePicker.basicText, { color: colors.text }]}>
          {selectedItem?.label}
        </Text>
        <Text
          style={[styles.arrow, responsivePicker.arrow, { color: colors.text }]}
        >
          ▼
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={[
            styles.modalOverlay,
            { backgroundColor: colors.pickerOverlay },
          ]}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.dropdown,
              {
                backgroundColor: colors.card,
                borderColor: colors.text,
                shadowColor: colors.text,
              },
            ]}
          >
            {allItems.map((item) => (
              <DropdownItem
                key={item.value}
                item={item}
                isSelected={value === item.value}
                onPress={handleItemPress}
              />
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    right: 10,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    maxWidth: 240,
    minWidth: 120,
  },
  dropdown: {
    borderRadius: 4,
    elevation: 5,
    left: '50%',
    marginLeft: -60,
    overflow: 'hidden',
    position: 'absolute',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    top: '40%',
    width: 120,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
    textAlign: 'center',
  },
  modalOverlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pickerButton: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    flex: 1,
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 4,
    maxWidth: 120,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
