import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
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

  const selectedItem = value
    ? items.find((item) => item.value === value)
    : placeholder;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor: colors.card,
            shadowColor: colors.text,
          },
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={{ color: colors.text }}>{selectedItem?.label}</Text>
        <Text style={[styles.arrow, { color: colors.text }]}>▼</Text>
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
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                value === placeholder.value && {
                  backgroundColor: colors.pickerOption,
                  borderBottomColor: colors.pickerElemBorder,
                },
              ]}
              onPress={() => {
                onValueChange(placeholder.value);
                setIsOpen(false);
              }}
            >
              <Text style={{ color: colors.text }}>{placeholder.label}</Text>
            </TouchableOpacity>

            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.dropdownItem,
                  value === item.value && {
                    backgroundColor: colors.pickerOption,
                    borderBottomColor: colors.pickerElemBorder,
                  },
                ]}
                onPress={() => {
                  onValueChange(item.value);
                  setIsOpen(false);
                }}
              >
                <Text style={{ color: colors.text }}>{item.label}</Text>
              </TouchableOpacity>
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
  dropdownItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
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
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 4,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 120,
  },
});
