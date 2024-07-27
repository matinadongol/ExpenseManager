import { View, Text } from "react-native";
import Button from "../components/UI/Button";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";


export default function Profile(){
  const authCtx = useContext(AuthContext)
  return (
    <View>
      <Text>Profile</Text>
      <Button onPress={authCtx.logout}>Logout</Button>
    </View>
  )
}