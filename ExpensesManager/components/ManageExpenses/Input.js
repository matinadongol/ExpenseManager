import {View, Text, TextInput, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function Input({label, style, textInputConfig}){
  const inputStyles = [styles.input]
  if(textInputConfig && textInputConfig.multiline){
    inputStyles.push(styles.inputMultiline)
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles}/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.accentColor,
    marginBottom: 4
  },
  input: {
    backgroundColor: GlobalStyles.colors.accentColor,
    color: GlobalStyles.colors.backgroundColor,
    padding: 6,
    borderRadius: 6,
    fontSize: 18
  },
  inputMultiline:{
    minHeight: 100,
    textAlignVertical: 'top'
  }
})