import {View, Text, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles'

export default function ExpensesSummary({expenses, periodName}) {
  const expensesSum = expenses.reduce((sum, expenses) => {
    return sum + expenses.amount
  }, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.backgroundColor,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 
  period: {
    fontSize: 16,
    color: GlobalStyles.colors.fontColor,
    letterSpacing: 2
  },
  sum: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GlobalStyles.colors.fontColor,
    letterSpacing: 2
  }
})