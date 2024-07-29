import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: GlobalStyles.colors.fontColor,
    marginBottom: 6,
    fontSize: 18,
    letterSpacing: 2
  },
  labelInvalid: {
    color: GlobalStyles.colors.error,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.inputFieldColor,
    color: GlobalStyles.colors.fontColor,
    borderRadius: 4,
    fontSize: 20,
    letterSpacing: 2
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.highlightInoutField,
  },
});
