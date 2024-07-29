import { View, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import { GlobalStyles } from '../constants/styles'

export function Settings() {
  const authCtx = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button onPress={authCtx.logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: GlobalStyles.colors.backgroundColor
  }
})
