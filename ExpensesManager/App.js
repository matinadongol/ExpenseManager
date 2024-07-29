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
import { Settings } from "./screens/Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

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
        headerTintColor: GlobalStyles.colors.inputFieldColor,
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
  const authCtx = useContext(AuthContext);
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
        headerStyle: { backgroundColor: GlobalStyles.colors.backgroundColor },
        headerTintColor: GlobalStyles.colors.fontColor,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.backgroundColor },
        tabBarActiveTintColor: GlobalStyles.colors.accentColor,
        tabBarInactiveTintColor: GlobalStyles.colors.fontColor,
        tabBarLabelStyle: { fontSize: 16, marginTop: 5 },
        headerRight: () => (
          <IconButton
            icon="add"
            size={24}
            color={GlobalStyles.colors.fontColor}
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
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Settings",
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
      SplashScreen.hideAsync();
    }
    fetchToken();
  }, []);
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
        <Navigation />
      </ExpenseContextProvider>
    </>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
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
