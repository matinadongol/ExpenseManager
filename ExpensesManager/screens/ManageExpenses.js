import { useContext, useLayoutEffect, useState } from 'react'
import {StyleSheet, View} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpensesForm from '../components/ManageExpenses/ExpensesForm'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export default function ManageExpenses({route}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
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

  async function deleteExpenseHandler(){
    setIsSubmitting(true)
    try{
      await deleteExpense(editedExpenseId)
      expenseCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    }catch(error){
      setError('could not delete - please try again')
      setIsSubmitting(false)
    }
  }

  if(error && !isSubmitting){
    return <ErrorOverlay message={error}/>
  }

  if(isSubmitting){
    return <LoadingOverlay/>
  }

  function cancelHandler(){
    navigation.goBack()
  }

  async function confirmHandler(expenseData){
    setIsSubmitting(true)
    try{
      if(isEditing){
        expenseCtx.updateExpense(editedExpenseId,expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expenseCtx.addExpense({...expenseData, id: id})
      }
      navigation.goBack()
    } catch(error){
      setError('could not save expenses - please try again')
      setIsSubmitting(false)
    }
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