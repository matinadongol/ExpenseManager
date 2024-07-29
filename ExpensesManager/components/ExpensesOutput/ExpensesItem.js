import { Pressable, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";


export default function ExpensesItem({id, description, amount, date}) {
  const navigation = useNavigation()
  function expensePressHandler(){
    navigation.navigate("ManageExpenses", {
      expenseId: id
    })
  }
  return (
    <Pressable 
      onPress={expensePressHandler}
      style={({pressed}) => pressed && styles.pressed}
    >
      <View style={styles.expensesItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  expensesItem: {
    padding: 12,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#24201b',
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.accentColor,
    fontSize: 18,
    letterSpacing: 2,
    marginTop: 8
  },
  description: {
    fontSize: 22,
    marginBottom: 4,
    fontWeight: '600',
    letterSpacing: 2
  },
  amountContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.accentColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
    letterSpacing: 2
  },
  amount:{
    color: GlobalStyles.colors.fontColorForAccent,
    fontWeight: '600',
    fontSize: 20,
    minWidth: '25%'
  }
})
