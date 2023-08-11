import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/COLORS";
import { Dimensions } from "react-native";
import { FlatList } from "react-native";
import ResultItem from "../components/ResultItem";
import { useDispatch, useSelector } from "react-redux";
import { appendIngredients } from "../slices/GroceriesSlice";
import {
  addPurchasedRecipe,
  clearSelectedItems,
  setMenu,
  setPurchase,
} from "../slices/MenuSlice";

const Results = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const recipes = useSelector((state) => state.Menu.recipes);
  const total_price = useSelector((state) => state.Menu.total_price);
  const bonus = useSelector((state) => state.Menu.bonus);
  const selectedItems = useSelector((state) => state.Menu.selectedItems);
  const inventory = useSelector((state) => state.Menu.inventory);

  const route = useRoute();
  const token = route.params?.token;
  const budget = route.params?.budget;
  const meal = route.params?.meal;

  const dispatch = useDispatch();

  const apiUrl =
    "https://api.makeyourownmealkit.com/v1/recipes/recalculate.php";

  const dispatchSetPurchase = async (status) => {
    return new Promise((resolve) => {
      dispatch(setPurchase({ status }));
      resolve();
    });
  };

  const recalculateRecipes = (save) => {
    setLoading1(true);

    const queryParams = new URLSearchParams();
    queryParams.append("token", token);
    queryParams.append("budget", parseInt(budget));
    queryParams.append("mealcop", parseInt(meal));
    queryParams.append("recipes", selectedItems);
    //queryParams.append("use_inventory", true);
    queryParams.append("save", save);

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
              ToastAndroid.show(body.error.message, ToastAndroid.LONG);
              break;

            default:
              ToastAndroid.show(body.error.message, ToastAndroid.SHORT);
              break;
          }
        } else {
          const dispatchSetMenu = async () => {
            return new Promise((resolve) => {
              const recipes = body.recipes;
              const total_price = body.total_price;
              const bonus = body.bonus;
              const inventory = body.inventory;

              dispatch(setMenu({ recipes, total_price, bonus, inventory }));
              resolve();
            });
          };
          dispatch(clearSelectedItems);
          dispatchSetMenu();
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
        // Handle other errors here
      })
      .finally(() => {
        setLoading1(false);
        setLoading2(false);
      });
  };

  const buyThisPlan = () => {
    setLoading2(true);
    recalculateRecipes(true);
    dispatch(addPurchasedRecipe({ purchasedRecipes: recipes, save: true }));
    dispatch(appendIngredients({ inventory, save: true }));
    dispatchSetPurchase(true).then(() => {
      ToastAndroid.show("Plan Purchased", ToastAndroid.SHORT);
    });
    navigation.goBack();
    navigation.navigate("Menu");
  };

  const footerComponent = (
    <View
      style={{
        justifyContent: "flex-start",
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={{
          margin: 5,
          borderRadius: 4,
          height: 68,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => recalculateRecipes(false)}
      >
        {loading1 ? (
          <ActivityIndicator size={24} color={COLORS.secondaryBackground} />
        ) : (
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 22,
              letterSpacing: 1,
              color: COLORS.primaryText,
            }}
          >
            Replace Selected
          </Text>
        )}
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: "Jost-700",
          fontSize: 14,
          color: COLORS.black,
          alignSelf: "center",
        }}
      >
        OR
      </Text>

      <TouchableOpacity
        style={{
          margin: 5,
          borderRadius: 4,
          height: 68,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={buyThisPlan}
      >
        {loading2 ? (
          <ActivityIndicator size={24} color={COLORS.secondaryBackground} />
        ) : (
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 22,
              letterSpacing: 1,
              color: "#393939",
            }}
          >
            BUY THIS PLAN ${total_price.toFixed(2)}
          </Text>
        )}
      </TouchableOpacity>
      <Text
        style={{
          margin: 5,
          fontFamily: "Jost-400",
          fontSize: 16,
          color: COLORS.black,
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-600",
            fontSize: 16,
            color: COLORS.black,
          }}
        >
          Includes:
        </Text>{" "}
        {"\n"}
        Recipes Saved 2 Menu {"\n"}Grocery List {"\n"}+Bonus ingredients saved
        for next time.
      </Text>
      <Text
        style={{
          margin: 5,
          fontFamily: "Jost-400",
          fontSize: 12,
          color: COLORS.black,
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-600",
            fontSize: 12,
            color: COLORS.black,
          }}
        >
          Disclaimer:
        </Text>{" "}
        Grocery cost is based on average US National grocery cost, actual
        pricing will vary based on location and final product selection.
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.secondaryBackground,
      }}
    >
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />
      <View
        style={{
          flex: 0.21,
          justifyContent: "flex-end",
          backgroundColor: COLORS.primaryBackground,
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-700",
            fontSize: 22,
            color: COLORS.primaryText,
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          Result:
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Jost-400",
              fontSize: 16,
              color: COLORS.primaryText,
            }}
          >
            Grocery Cost:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 16,
              color: COLORS.primaryText,
            }}
          >
            ${total_price.toFixed(2)}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            alignItems: "center",
            marginTop: 5,
            marginBottom: 10,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Jost-400",
              fontSize: 16,
              color: COLORS.primaryText,
            }}
          >
            Bonus Ingredients:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 16,
              color: COLORS.primaryText,
            }}
          >
            ${bonus.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={{ flex: 0.8 }}>
        <FlatList
          data={[...recipes, { id: "footer" }]} // Add a dummy footer item
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            if (item.id === "footer") {
              return footerComponent;
            } else {
              return (
                <ResultItem
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  time={item.time}
                />
              );
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* footer */}
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({});
