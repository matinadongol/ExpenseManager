import {StyleSheet, View} from 'react-native'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Levis jacket',
    amount: 85.99,
    date: new Date('2024-12-19')
  },
  {
    id: 'e2',
    description: 'Shein',
    amount: 89.99,
    date: new Date('2024-12-20')
  },
  {
    id: 'e3',
    description: 'Aldo heels',
    amount: 135.99,
    date: new Date('2024-12-25')
  }
]

export default function ExpensesOutput({expenses, expensesPeriod}) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.backgroundColor
  }
})