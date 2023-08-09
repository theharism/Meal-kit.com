import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Recipes,
  Menu,
  Groceries,
  Rating,
  ReConfirm,
  OnBoarding,
  Login,
  Signup,
} from "./src/screens";
import { PaperProvider } from "react-native-paper";
import { COLORS } from "./src/constants/COLORS";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
import GroceriesSlice from "./src/slices/GroceriesSlice";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AuthSlice from "./src/slices/AuthSlice";

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: {
    Groceries: GroceriesSlice,
    Auth: AuthSlice,
  },
});

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        animationEnabled: true,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: COLORS.secondaryBackground,
        },
        headerTitle: "",
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const { width, height } = Dimensions.get("screen");

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          width: "auto",
          margin: 0,
          paddingHorizontal: 70,
          height: height * 0.075,
        },
        tabBarItemStyle: { marginVertical: 8 },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: COLORS.black,
      }}
    >
      <Tab.Screen
        name="Recipes"
        component={Recipes}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTitleAlign: "center",
          headerTintColor: COLORS.secondaryBackground,
          headerStyle: {
            backgroundColor: COLORS.primaryBackground,
            height: height * 0.095,
          },
          headerTitleStyle: { fontSize: 22, fontFamily: "Jost-700" },
          headerTitleContainerStyle: {
            justifyContent: "flex-end",
            marginBottom: 10,
          },
        }}
      />
      <Tab.Screen
        name="Groceries"
        component={Groceries}
        options={{
          headerTitle: "Grocery List",
          headerTitleAlign: "center",
          headerTintColor: COLORS.secondaryBackground,
          headerStyle: {
            backgroundColor: COLORS.primaryBackground,
            height: 125,
          },
          headerTitleStyle: {
            fontSize: 24,
            fontFamily: "Jost-700",
            letterSpacing: 2,
          },
          headerTitleContainerStyle: {
            justifyContent: "flex-end",
            marginBottom: 15,
          },
        }}
      />
    </Tab.Navigator>
  );
};

function StartUp() {
  const token = useSelector((state) => state.Auth.token);

  let [fontsLoaded] = useFonts({
    "Jost-800": require("./assets/fonts/static/Jost-ExtraBold.ttf"),
    "Jost-700": require("./assets/fonts/static/Jost-Bold.ttf"),
    "Jost-600": require("./assets/fonts/static/Jost-SemiBold.ttf"),
    "Jost-500": require("./assets/fonts/static/Jost-Medium.ttf"),
    "Jost-400": require("./assets/fonts/static/Jost-Regular.ttf"),
    "Jost-400-I": require("./assets/fonts/static/Jost-Italic.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>SplashScreen Demo! 👋</Text>
      </View>
    );
  }

  if (fontsLoaded) {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    })();
  }

  return (
    <PaperProvider>
      {token == null ? <AuthStack /> : <BottomTabs />}
      {/* <Rating /> */}
      {/* <ReConfirm /> */}
    </PaperProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StartUp />
      </Provider>
    </NavigationContainer>
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
