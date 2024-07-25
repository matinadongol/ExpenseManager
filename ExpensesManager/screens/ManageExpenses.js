import { useContext, useLayoutEffect } from 'react'
import {StyleSheet, View} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'
import ExpensesForm from '../components/ManageExpenses/ExpensesForm'

export default function ManageExpenses({route}) {
  const expenseCtx = useContext(ExpensesContext)
  const navigation = useNavigation()
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expenses' : 'Add Expenses'
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler(){
    expenseCtx.deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  function cancelHandler(){
    navigation.goBack()
  }

  function confirmHandler(){
    if(isEditing){
      expenseCtx.updateExpense(
        editedExpenseId,
        {
          description: 'Test!!!',
          amount: 3.22,
          date: new Date('2024-06-22')
        }
      )
    } else {
      expenseCtx.addExpense(
        {
          description: 'Test',
          amount: 31.22,
          date: new Date('2024-01-12')
        }
      )
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpensesForm/>
      <View style={styles.buttons}> 
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} mode="flat" onPress={confirmHandler}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon="trash" 
            color={GlobalStyles.colors.error} 
            size={36} 
            onPress={deleteExpenseHandler}
          /> 
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.backgroundColor
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.accentColor,
    alignItems: 'center'
  }
})