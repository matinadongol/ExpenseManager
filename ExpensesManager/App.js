import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpenseContextProvider from "./store/expenses-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useCallback, useContext, useEffect, useState } from "react";
import Profile from "./screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.backgroundColor },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.backgroundColor },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
function ExpenseStack() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.accentColor,
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={ExpensesOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpenses"
          component={ManageExpenses}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Navigator>
  );
}
function Navigation() {
  const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <ExpenseStack />}
    </NavigationContainer>
  );
}
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.accentColor },
        headerTintColor: {
          backgroundColor: GlobalStyles.colors.fontColorForAccent,
        },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.accentColor },
        tabBarActiveTintColor: {
          color: GlobalStyles.colors.fontColorForAccent,
        },
        tabBarInactiveTintColor: {
          color: GlobalStyles.colors.fontColorForAccent,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpenses");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    async function fetchToken(){
      const storedToken = await AsyncStorage.getItem('token')
      if(storedToken){
        authCtx.authenticate(storedToken)
      }
      setIsTryingLogin(false)
      SplashScreen.hideAsync();
    }
    fetchToken()
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      await SplashScreen.hideAsync(); 
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null; 
  }
  return (
    <>
      <ExpenseContextProvider>
        <Navigation/>
      </ExpenseContextProvider>
    </>
  )
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
