import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { COLORS } from "../constants/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../slices/MenuSlice";
import { resetToken } from "../slices/AuthSlice";
import { setUse_Inventory } from "../slices/GroceriesSlice";

const Recipes = ({ navigation }) => {
  const [meal, setMeal] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [use_inventory, setUseInventory] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);

  const ingredients = useSelector((state) => state.Groceries.ingredients);
  const groceriesuseInventory = useSelector(
    (state) => state.Groceries.use_inventory
  );

  const apiUrl = "https://api.makeyourownmealkit.com/v1/recipes/first.php";

  const goButtonPress = () => {
    if (people.length == 0 || budget.length == 0 || meal.length == 0) {
      return;
    }
    dispatch(setUse_Inventory({ value: false }));
    setLoading(true);

    const queryParams = new URLSearchParams();
    queryParams.append("token", token);
    queryParams.append("budget", parseInt(budget));
    queryParams.append("mealcop", parseInt(meal));

    queryParams.append("use_inventory", use_inventory);

    const urlWithQuery = apiUrl + "?" + queryParams.toString();

    fetch(urlWithQuery, {
      method: "GET",
    })
      .then(async function (response) {
        const body = await response.json();

        if (response.status != 200) {
          switch (body.error.code) {
            case 400:
              ToastAndroid.show(body.error.message, ToastAndroid.LONG);
              break;

            case 401:
              dispatch(resetToken());
              ToastAndroid.show(body.error.message, ToastAndroid.LONG);
              break;

            default:
              ToastAndroid.show(body.error.message, ToastAndroid.SHORT);
              break;
          }
        } else {
          const dispatchSetMenu = async () => {
            return new Promise((resolve, reject) => {
              const recipes = body.recipes;

              const total_price = body.total_price;
              const bonus = body.bonus;
              const inventory = body.inventory;

              if (recipes.length == 0) {
                reject("Low Budget");
              }

              dispatch(setMenu({ recipes, total_price, bonus, inventory }));
              resolve();
            });
          };

          dispatchSetMenu()
            .then(
              function () {
                navigation.navigate("Results", { token, budget, meal });
              },
              function (error) {
                ToastAndroid.show(error, ToastAndroid.SHORT);
              }
            )
            .catch((error) => {
              ToastAndroid.show(error, ToastAndroid.LONG);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
        // Handle other errors here
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const confirmCondition = () => {
    if (ingredients.length > 0) {
      navigation.navigate("ReConfirm");
      setUseInventory(true);
    } else goButtonPress();
  };
  if (groceriesuseInventory) {
    goButtonPress();
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 200 }} />
          <Text variant="headlineLarge" style={styles.title}>
            Make Your Own Meal-kit.com
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Number of meals"
              value={meal}
              keyboardType="number-pad"
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              theme={styles.theme}
              contentStyle={{
                fontFamily: "Jost-400",
                height: 68,
                fontSize: 24,
              }}
              textColor={COLORS.secondaryBackground}
              onChangeText={(meal) => setMeal(meal)}
            />
            <TextInput
              label="Number of People"
              value={people}
              mode="outlined"
              keyboardType="number-pad"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              theme={styles.theme}
              textColor={COLORS.secondaryBackground}
              onChangeText={(people) => setPeople(people)}
              contentStyle={{
                fontFamily: "Jost-400",
                height: 68,
                fontSize: 24,
              }}
            />
            <TextInput
              label="Enter your budget"
              value={budget}
              mode="outlined"
              keyboardType="number-pad"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              onChangeText={(budget) => setBudget(budget)}
              theme={styles.theme}
              contentStyle={{
                fontFamily: "Jost-400",
                height: 68,
                fontSize: 24,
              }}
              textColor={COLORS.secondaryBackground}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={confirmCondition}>
            {loading ? (
              <ActivityIndicator size={24} color={COLORS.primaryBackground} />
            ) : (
              <Text style={styles.buttonText}>GO</Text>
            )}
          </TouchableOpacity>
          <View style={{ marginBottom: 200 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    color: COLORS.primaryText,
    textAlign: "center",
    marginBottom: 50,
    fontFamily: "Jost-800",
    fontSize: 30,
    letterSpacing: 2,
  },
  inputContainer: {
    justifyContent: "space-between",
    flex: 0.1,
    marginBottom: 60,
  },
  outline: {
    borderWidth: 3,
  },
  theme: {
    colors: {
      onSurfaceVariant: "white",
    },
  },
  input: {
    backgroundColor: COLORS.primaryBackground,
    height: 60,
    color: "#fff",
    fontSize: 24,
  },
  button: {
    backgroundColor: COLORS.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 68,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.secondaryText,
    fontSize: 24,
    fontFamily: "Jost-700",
  },
});
