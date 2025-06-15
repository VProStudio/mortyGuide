import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ThemeContext } from '@/theme/ThemeContext';
import React, { useState } from 'react';

export type CustomPickerProps = {
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
    placeholder = { label: 'All', value: '' }
}) => {
    const { colors } = React.useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);

    const selectedItem = value ? items.find(item => item.value === value) : placeholder;

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}

            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    {
                        backgroundColor: colors.card,
                        shadowColor: colors.text,
                    }
                ]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={{ color: colors.text, textAlign: 'center', }}>
                    {selectedItem?.label}
                </Text>
                <Text style={{ color: colors.text, position: 'absolute', right: 10 }}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
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
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                styles.dropdownItem,
                                value === placeholder.value && { backgroundColor: colors.pickerOption }
                            ]}
                            onPress={() => {
                                onValueChange(placeholder.value);
                                setIsOpen(false);
                            }}
                        >
                            <Text style={{ color: colors.text }}>{placeholder.label}</Text>
                        </TouchableOpacity>

                        {items.map(item => (
                            <TouchableOpacity
                                key={item.value}
                                style={[
                                    styles.dropdownItem,
                                    value === item.value && { backgroundColor: colors.pickerOption }
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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    pickerButton: {
        height: 40,
        width: 120,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginHorizontal: 4,
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,

    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        position: 'absolute',
        width: 120,
        borderRadius: 4,
        overflow: 'hidden',
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        top: '40%',
        left: '50%',
        marginLeft: -60,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
    }
});
