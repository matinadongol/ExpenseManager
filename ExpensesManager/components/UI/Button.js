import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


export default function Button({children, onPress, mode, style}){
  return (
    <View style={style}>
      <Pressable 
        onPress={onPress}
        style={({pressed})=> pressed && styles.pressed }
      >
        <View style={[styles.button, mode=="flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode=="flat" && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.accentColor,
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: GlobalStyles.colors.fontColorForAccent,
    textAlign: 'center',
    paddingVertical: 8, 
    paddingHorizontal: 16 
  },
  flatText: {
    color: "red"
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.accentColor,
    borderRadius: 4
  }
})