import {Text, View, StyleSheet} from 'react-native'
import Input from './Input'
import { GlobalStyles } from '../../constants/styles'

export default function ExpensesForm(){
  function amountChangeHandler(){
    
  }
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add your expense</Text>
      <View style={styles.inputRow}>
        <Input 
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangeHandler
          }}
        />
        <Input 
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            onChangeText: () => {}
          }}
        />
      </View>
      <Input 
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none',
          // autoCorrect: false
        }}
        style={styles.rowInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.accentColor,
    marginVertical: 24
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1,
    marginHorizontal: 4
  }
})