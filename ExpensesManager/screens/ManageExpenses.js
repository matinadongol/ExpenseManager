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

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  )

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

  function confirmHandler(expenseData){
    if(isEditing){
      expenseCtx.updateExpense(editedExpenseId,expenseData)
    } else {
      expenseCtx.addExpense(expenseData)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpensesForm 
        submitButtonLabel={isEditing ? "Update" : "Add"} 
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      /> 
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.accentColor,
    alignItems: 'center'
  }
})