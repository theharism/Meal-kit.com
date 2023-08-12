import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { Divider } from "react-native-paper";

import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GroceriesItem } from "../components";

import { deleteIngredients, setUse_Inventory } from "../slices/GroceriesSlice";

const ReConfirm = ({ navigation }) => {
  const GroceriesItems = useSelector((state) => state.Groceries.ingredients);
  const selectedItems = useSelector((state) => state.Groceries.selectedItems);
  const token = useSelector((state) => state.Auth.token);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const apiUrl = "https://api.makeyourownmealkit.com/v1/inventory/delete.php";

  const deleteServerIngredients = () => {
    setLoading(true);

    function deleteUserInventoryIngredient(token, id) {
      return new Promise((resolve, reject) => {
        const data = new URLSearchParams();
        data.append("token", token);
        data.append("ingredient", id);

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
              resolve();
            }
          })
          .catch((error) => {
            console.log(error);
            ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
            reject(error);
          });
      });
    }

    selectedItems.map((id) => deleteUserInventoryIngredient(token, id));
    dispatch(deleteIngredients());
    setLoading(false);
    dispatch(setUse_Inventory({ value: true }));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />

      <View style={{ padding: 10, margin: 5 }}>
        <Text
          style={{
            color: "#393939",
            fontSize: 20,
            fontFamily: "Jost-500",
          }}
        >
          DO YOU STILL HAVE THESE FROM LAST TIME?
        </Text>
      </View>

      <Divider horizontalInset />
      <FlatList
        data={GroceriesItems}
        renderItem={({ item }) => (
          <GroceriesItem
            title={item.ingredient.name}
            subTitle={item.ingredient.display_quantity}
            id={item.ingredient.id}
            unit={item.ingredient.display_name}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={{ padding: 10, marginVertical: 5 }}>
        <Text style={{ fontFamily: "Jost-700", fontSize: 12 }}>
          We will use these ingredients in your next meal plan if you still have
          them, so please check quantity, quality, and expiration dates.{"\n"}
          {"\n"}
          <Text style={{ fontFamily: "Jost-700", fontSize: 12 }}>
            Caution:{" "}
          </Text>
          <Text style={{ fontFamily: "Jost-400-I", fontSize: 12 }}>
            Make sure these items have been stored per producer's recommendation
            and are still safe to eat. If in doubt, don’t eat them.
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginVertical: 15,
          marginHorizontal: 21,
          borderRadius: 5,
          height: 60,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000000", // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.4, // Shadow opacity
          shadowRadius: 10, // Shadow radius
          elevation: 5, // Elevation for Android
        }}
        onPress={deleteServerIngredients}
      >
        {loading ? (
          <ActivityIndicator
            color={COLORS.secondaryBackground}
            size={30}
            style={{ alignSelf: "center" }}
          />
        ) : (
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 16,
              letterSpacing: 1,
              color: COLORS.primaryText,
            }}
          >
            Confirm
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReConfirm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryBackground },
});
