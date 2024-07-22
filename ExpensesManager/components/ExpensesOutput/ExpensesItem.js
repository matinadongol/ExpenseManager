import { Pressable, View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";


export default function ExpensesItem({description, amount, date}) {
  const navigation = useNavigation()
  function expensePressHandler(){
    navigation.navigate("ManageExpenses")
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
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
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
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.backgroundColor,
    shadowRadius: 4,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4
  },
  textBase: {
    color: GlobalStyles.colors.fontColorForAccent
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80
  },
  amount:{
    color: GlobalStyles.colors.fontColorForAccent,
    fontWeight: 'bold'
  }
})
