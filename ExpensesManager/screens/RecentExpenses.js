import {Text} from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useContext, useEffect, useState } from 'react'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fetchExpense } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

export default function RecentExpenses() {
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)

  useEffect(()=> {
    async function getExpenses(){
      setFetching(true)
      try{
        const expenses = await fetchExpense()
        expensesCtx.setExpenses(expenses)
      } catch (error){
        setError("Could not load previous expenses!")
      }
      setFetching(false)
    }
    getExpenses()
  }, [])

  if(error && !fetching){
    return <ErrorOverlay message={error}/>
  }

  if(fetching){
    return <LoadingOverlay/>
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    return (expense.date >= date7DaysAgo) && (expense.date <= today)
  })
  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallbackText="No expenses for the last 7 days"/>
  )
}