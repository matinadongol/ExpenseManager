import {View, Text, TextInput, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function Input({label, invalid, style, textInputConfig}){
  const inputStyles = [styles.input]
  if(textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiline)
  }
  if(invalid){
    inputStyles.push(styles.invalidInput)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles}/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 20
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.accentColor,
    marginBottom: 4,
    letterSpacing: 2,
    fontSize: 18
  },
  input: {
    backgroundColor: GlobalStyles.colors.inputFieldColor,
    color: GlobalStyles.colors.fontColor,
    padding: 6,
    borderRadius: 6,
    letterSpacing: 2,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 16 
  },
  inputMultiline:{
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.colors.error
  },
  invalidInput: {
    color: GlobalStyles.colors.highlightInoutField
  }
})
