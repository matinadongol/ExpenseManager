import {Text, View, StyleSheet, Alert} from 'react-native'
import Input from './Input'
import { GlobalStyles } from '../../constants/styles'
import { useState } from 'react'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

export default function ExpensesForm({submitButtonLabel, onCancel, onSubmit, defaultValues}){
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '', 
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true
    }
  })
  function inputChangeHandler(inputIdentifier, enteredValue){
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
    })
  }
  function submitHandler(){
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = !isNaN(expenseData.date.getTime())
    const descriptionIsValid = expenseData.description.trim().length > 0

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      //Alert.alert('Invalid Input', 'Please check your input values')
      setInputs((curInputs) => {
        return {
          amount: {
            value: curInputs.amount.value,
            isValid: amountIsValid
          },
          date: {
            value: curInputs.date.value,
            isValid: dateIsValid
          },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid
          }
        }
      })
      return
    }

    onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid 
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Add your expense</Text>
      <View style={styles.inputRow}>
        <Input 
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input 
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input 
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none',
          // autoCorrect: false
          onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
        }}
        style={styles.rowInputDesc}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid data entered - Please check your data</Text>}
      <View style={styles.buttons}> 
        <Button style={styles.cancelButton} mode="flat" onPress={onCancel}><Text style={styles.cancelButtonText}>Cancel</Text></Button>
        <Button style={styles.addButton} mode="flat" onPress={submitHandler}><Text style={styles.addButtonText}>{submitButtonLabel}</Text></Button>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.colors.accentColor,
    marginVertical: 24,
    letterSpacing: 2
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  rowInput: {
    marginHorizontal: 10,
    width: '45%'
  },
  rowInputDesc: {
    marginHorizontal: 10,
    height: 150
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error,
    margin: 8,
    letterSpacing: 2,
    fontSize: 16
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'flex-start'
  },
  cancelButton: {
    minWidth: 120,
    marginHorizontal: 8, 
    backgroundColor: GlobalStyles.colors.inputFieldColor
  },
  cancelButtonText: {
    color: GlobalStyles.colors.accentColor,
    fontSize: 18,
    letterSpacing: 2
  },
  addButton: {
    minWidth: 120,
    marginHorizontal: 8, 
    backgroundColor: GlobalStyles.colors.accentColor
  },
  addButtonText: {
    color: GlobalStyles.colors.inputFieldColor,
    fontSize: 18,
    letterSpacing: 2,
    paddingVertical: 12, // Add vertical padding
    paddingHorizontal: 16 
  }
})