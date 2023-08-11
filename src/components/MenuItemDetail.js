import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../constants/COLORS";
import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { resetToken } from "../slices/AuthSlice";
import * as Linking from "expo-linking";

const apiUrl = "https://api.makeyourownmealkit.com/v1/recipes/get.php";

const CustomImage = ({ uri, style: passedStyle }) => {
  const defaultStyle = {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: COLORS.primaryBackground,
    borderWidth: 1,
    resizeMode: "center",
  };

  const combinedStyle = { ...defaultStyle, ...passedStyle };

  return (
    <Image
      source={{
        uri,
      }}
      style={combinedStyle}
    />
  );
};

const CustomButton = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        isSelected
          ? [
              styles.button,
              { borderBottomWidth: 3, borderBottomColor: "#393939" },
            ]
          : styles.button
      }
    >
      <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const ButtonRow = ({ selectedButton, setSelectedButton, url }) => {
  return (
    <View style={styles.container}>
      <CustomButton
        label="Method"
        isSelected={selectedButton === "Method"}
        onPress={() => handleOpenLink(url)}
      />
      <CustomButton
        label="Ingredients"
        isSelected={selectedButton === "Ingredients"}
        onPress={() => setSelectedButton("Ingredients")}
      />
    </View>
  );
};

const getShortForm = (matchType) => {
  switch (matchType) {
    case "teaspoons":
      return "tsp";
    case "grams":
      return "g";
    case "units":
      return "u";
    // Add more cases for other match_types if needed
    default:
      return matchType;
  }
};

const renderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialIcons
        name="local-grocery-store"
        size={18}
        color="black"
        style={{ marginRight: 5 }}
      />
      <Text style={styles.name}>{item.ingredient.name}</Text>
    </View>
    <Text style={styles.quantity}>
      {item.match_quantity} {getShortForm(item.match_type)}
    </Text>
  </View>
);

const handleOpenLink = async (url) => {
  // Check if the link is supported on the device
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    // Open the link
    await Linking.openURL(url);
  } else {
    ToastAndroid.show("Cannot open the link.", ToastAndroid.SHORT);
  }
};

const MenuItemDetail = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [selectedButton, setSelectedButton] = useState("Ingredients");
  const { width, height } = Dimensions.get("screen");

  const dispatch = useDispatch();

  function getRecipeDetails(id) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append("id", id);

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
            resolve(body);
          }
        })
        .catch((error) => {
          console.log(error);
          ToastAndroid.show("Request Failed", ToastAndroid.SHORT);
          reject(error);
        });
    });
  }

  useEffect(() => {
    getRecipeDetails(id)
      .then((Response) => {
        setRecipe(Response.recipe);
        setIngredients(Response.ingredients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Response:", error);
      });
  }, []);

  const url = recipe.link;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.secondaryBackground }}
    >
      <StatusBar hidden />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
            Loading...
          </Text>
        </View>
      ) : (
        <>
          <View>
            <Image
              source={{
                uri: recipe.image,
              }}
              style={{
                position: "relative",
                height: 339,
                resizeMode: "cover",
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(39, 39, 39, 0.35)",
                "rgba(20, 20, 20, 0.6)",
                "rgba(0, 0, 0, 0.95)",
              ]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 339,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}
            />

            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                margin: 20,
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                width: width * 0.95,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 70,
                }}
              >
                <Ionicons name="heart-outline" size={30} color="white" />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color="white"
                />
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Jost-700",
                  fontSize: 24,
                  color: COLORS.primaryText,
                }}
              >
                {recipe.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: 130,
                  justifyContent: "space-between",
                  marginVertical: 5,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="clock"
                    color="white"
                    size={13}
                    style={{ marginRight: 3, width: 13, height: 13 }}
                  />
                  <Text
                    style={{
                      marginLeft: 3,
                      fontSize: 11,
                      color: COLORS.primaryText,
                    }}
                  >
                    {recipe.cooking_time} min
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      marginTop: 2,
                      width: 11.5, // Adjust the size of the circle as needed
                      height: 11.5, // Adjust the size of the circle as needed
                      borderRadius: 5.5, // Half of the width/height to create a circle
                      borderWidth: 1, // Border width
                      backgroundColor: COLORS.secondaryBackground, // Border color
                      borderColor: COLORS.secondaryBackground,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 3,
                    }}
                  >
                    <Fontisto name="dollar" size={8} color="black" />
                  </View>

                  <Text
                    style={{
                      marginLeft: 3,
                      fontSize: 11,
                      color: COLORS.primaryText,
                    }}
                  >
                    ${recipe.price}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "rgba(86,86,86,0.5)",
                  height: 35,
                  width: 220,
                  borderRadius: 60,
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center", // Center the content vertically
                  justifyContent: "center", // Center the content horizontally
                  overflow: "hidden", // Clip any overflowing content
                }}
              >
                <CustomImage
                  uri={
                    "https://businesstech.co.za/news/wp-content/uploads/2015/03/Male-ideal-beauty.jpg"
                  }
                  style={{
                    marginLeft: -10, // Adjust the negative margin for overlap
                  }}
                />
                <CustomImage
                  uri={
                    "https://cdn-dedel.nitrocdn.com/XJYeFUtCsHycKrVTopSKGvqUgTSQzmZs/assets/images/optimized/rev-2544a2c/www.kayacosmedica.com.au/wp-content/uploads/2020/06/male-fillers-patient-480x650.jpg"
                  }
                  style={{
                    marginLeft: -10, // Adjust the negative margin for overlap
                  }}
                />
                <CustomImage
                  uri={
                    "https://i.pinimg.com/originals/94/6e/82/946e829a135f68d7a041e3a83b445f55.jpg"
                  }
                  style={{
                    marginLeft: -10, // Adjust the negative margin for overlap
                    marginRight: 5, // Add some margin to the last image to balance the overlap
                  }}
                />

                <Text
                  style={{
                    fontFamily: "Jost-400",
                    fontSize: 12,
                    color: "#9E9E9E",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  & 10 others have made this
                </Text>
              </View>
            </View>
          </View>
          <ButtonRow
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            url={url}
          />
          {selectedButton === "Ingredients" ? (
            <FlatList
              data={ingredients}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />
          ) : null}
          <TouchableOpacity
            style={{
              //margin: 10,
              borderRadius: 4,
              height: height * 0.085,
              backgroundColor: COLORS.primaryBackground,
              justifyContent: "center",
              alignItems: "center",
              width: width * 0.95,
              alignSelf: "center",
            }}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default MenuItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 16,
    fontFamily: "Jost-400",
  },
  quantity: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Jost-400",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Jost-400",
    color: "#666666",
  },
  selectedText: {
    fontSize: 18,
    fontFamily: "Jost-700",
    color: "#393939",
  },
});
