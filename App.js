import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import {
  Recipes,
  Menu,
  Groceries,
  Rating,
  ReConfirm,
  OnBoarding,
  Login,
  Signup,
  Results,
} from "./src/screens";
import { PaperProvider } from "react-native-paper";
import { COLORS } from "./src/constants/COLORS";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import GroceriesSlice, { appendIngredients } from "./src/slices/GroceriesSlice";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AuthSlice, { setToken } from "./src/slices/AuthSlice";
import MenuSlice, { addPurchasedRecipe } from "./src/slices/MenuSlice";
import { useState } from "react";
import { MenuItemDetail } from "./src/components";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: {
    Groceries: GroceriesSlice,
    Auth: AuthSlice,
    Menu: MenuSlice,
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

const RecipesStack = () => {
  const Stack1 = createStackNavigator();
  return (
    <Stack1.Navigator
      initialRouteName="RecipesHome"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <Stack1.Screen
        name="RecipesHome"
        component={Recipes}
        options={{ headerShown: false }}
      />
      <Stack1.Screen
        name="ReConfirm"
        component={ReConfirm}
        options={{
          headerTitle: "CONFIRM INVENTORY",
          headerTitleAlign: "center",
          headerTintColor: COLORS.secondaryBackground,
          headerStyle: {
            backgroundColor: COLORS.primaryBackground,
            height: 125,
          },
          headerLeft: null,
          headerTitleStyle: { fontSize: 24, fontFamily: "Jost-700" },
          headerTitleContainerStyle: {
            justifyContent: "flex-end",
            marginBottom: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-restaurant" color={color} size={size} />
          ),
          tabBarLabelStyle: {
            fontFamily: "Jost-500",
            fontSize: 12,
            color: "#393939",
          },
        }}
      />
      <Stack1.Screen
        name="Results"
        component={Results}
        options={{ headerShown: false }}
      />
    </Stack1.Navigator>
  );
};

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const { width, height } = Dimensions.get("screen");
  const tabBarHeight = Platform.OS === "ios" ? height * 0.12 : height * 0.08;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          width: "auto",
          paddingHorizontal: 70,
          height: tabBarHeight,
        },

        tabBarLabelStyle: {
          fontFamily: "Jost-500",
          fontSize: 12,
          color: "#393939",
          marginBottom: 15,
        },
        tabBarIconStyle: {
          marginTop: 5, // Adjust the spacing between icon and label
        },
        tabBarActiveTintColor: COLORS.black,
      }}
    >
      <Tab.Screen
        name="Recipes"
        component={RecipesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("./assets/images/black_dish.png")
                  : require("./assets/images/gray_dish.png")
              }
              style={{ width: 30, height: 30 }}
            />
          ),
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-restaurant" color={color} size={size} />
          ),
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-cart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function StartUp() {
  const [localToken, setLocalToken] = useState(null);
  const dispatch = useDispatch();
  const Stack = createStackNavigator();

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    async function getLocalData() {
      AsyncStorage.getItem("token").then((token) => {
        if (token) {
          setLocalToken(token);
          dispatch(setToken({ token }));
        }
      });
      AsyncStorage.getItem("Menu").then((jsonValue) => {
        const recipes = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (recipes != null) {
          dispatch(
            addPurchasedRecipe({ purchasedRecipes: recipes, save: false })
          );
        }
      });
      AsyncStorage.getItem("Groceries").then((jsonValue) => {
        const groceries = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (groceries != null) {
          dispatch(appendIngredients({ inventory: groceries, save: true }));
        }
      });
      // await AsyncStorage.removeItem("Menu");
      //await AsyncStorage.removeItem("Groceries");
      //await AsyncStorage.removeItem("token");
    }
    getLocalData();
  }, []);

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
      {token == null ? (
        <AuthStack />
      ) : (
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="Home"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MenuItemDetail"
            component={MenuItemDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rating"
            component={Rating}
            options={{
              headerTitle: "",

              headerTintColor: COLORS.secondaryBackground,
              headerStyle: {
                backgroundColor: COLORS.primaryBackground,
                height: 100,
              },
            }}
          />
        </Stack.Navigator>
      )}

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
