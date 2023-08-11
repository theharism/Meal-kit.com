import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ToastAndroid,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { MenuItem } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { resetToken } from "../slices/AuthSlice";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook

const apiUrl = "https://api.makeyourownmealkit.com/v1/account/recipes/get.php";

const Menu = () => {
  const token = useSelector((state) => state.Auth.token);
  const recipes = useSelector((state) => state.Menu.purchasedRecipes);
  const navigation = useNavigation();
  //const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function getuserRecipes(token) {
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
            resolve(body.recipes);
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
          reject(error);
        });
    });
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getuserRecipes(token)
  //       .then((recipes) => {
  //         setRecipes(recipes);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching recipes:", error);
  //       });
  //   }, [])
  // );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />

      {loading ? (
        <>
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
        </>
      ) : (
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <MenuItem
              title={item.title}
              cost={item.price}
              image={item.image}
              id={item.id}
              time={item.time}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryBackground,
    justifyContent: "center",
  },
});
