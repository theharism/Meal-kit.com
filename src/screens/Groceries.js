import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { COLORS } from "../constants/COLORS";
import { Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CustomBottomSheet, GroceriesItem } from "../components";
import { Dimensions } from "react-native";
import { resetToken } from "../slices/AuthSlice";
import { deleteIngredients, setItems } from "../slices/GroceriesSlice";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook

const apiUrl = "https://api.makeyourownmealkit.com/v1/inventory/get.php";

const Groceries = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("screen");
  //const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.Auth.token);
  const ingredients = useSelector((state) => state.Groceries.ingredients);
  const selectedItems = useSelector((state) => state.Groceries.selectedItems);

  function getuserInventory(token) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append("token", token);

      const urlWithQuery = apiUrl + "?" + data.toString();

      fetch(urlWithQuery, {
        method: "GET",
      })
        .then(async function (response) {
          const body = await response.json();

          if (response.status !== 200) {
            switch (body.error.code) {
              case 400:
                ToastAndroid.show(body.error.message, ToastAndroid.LONG);
                reject(new Error(body.error.message));
                break;

              case 401:
                dispatch(resetToken());
                ToastAndroid.show(body.error.message, ToastAndroid.LONG);
                reject(new Error(body.error.message));
                break;

              default:
                ToastAndroid.show(body.error.message, ToastAndroid.SHORT);
                reject(new Error(body.error.message));
                break;
            }
          } else {
            resolve(body.inventory);
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
          reject(error);
        });
    });
  }

  const deleteIngredientsFunc = () => {
    dispatch(deleteIngredients());
  };

  const openSheet = () => {
    assetBottomSheet.current?.snapToIndex(1);
  };

  const assetBottomSheet = useRef(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getuserInventory(token)
  //       .then((ingredient) => {
  //         setIngredients(ingredient);
  //         setLoading(false);
  //         dispatch(setItems({ items: ingredient }));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching ingredients:", error);
  //       });
  //   }, [])
  // );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />

      <View style={{ padding: 10, marginLeft: 5 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 32,
          }}
          onPress={openSheet}
        >
          <Text
            style={{
              color: COLORS.secondaryText,
              fontSize: 16,
              fontFamily: "Jost-500",
            }}
          >
            Add item
          </Text>
          <AntDesign
            name="pluscircle"
            size={20}
            color={COLORS.primaryBackground}
          />
        </TouchableOpacity>
      </View>

      <Divider horizontalInset />
      {loading ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator
            color={COLORS.primaryBackground}
            size={30}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              color: COLORS.secondaryText,
              fontFamily: "Jost-400",
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            Loading
          </Text>
        </View>
      ) : (
        <FlatList
          data={ingredients}
          renderItem={({ item }) => (
            <GroceriesItem
              title={item.ingredient.name}
              subTitle={item.ingredient.grams}
              id={item.ingredient.id}
              price={item.ingredient.price}
            />
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <TouchableOpacity
        style={{
          marginBottom: 10,
          borderRadius: 4,
          height: 68,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          width: width * 0.95,
          alignSelf: "center",
        }}
        onPress={deleteIngredientsFunc}
      >
        <Text
          style={{
            fontFamily: "Jost-700",
            fontSize: 24,
            letterSpacing: 1,
            color: COLORS.primaryText,
          }}
        >
          Mark As Purchased
        </Text>
      </TouchableOpacity>
      <CustomBottomSheet assetBottomSheet={assetBottomSheet} />
    </SafeAreaView>
  );
};

export default Groceries;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryBackground },
});
