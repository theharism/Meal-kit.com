import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { COLORS } from "../constants/COLORS";
import { useDispatch } from "react-redux";
import { Divider } from "react-native-paper";
import { addSelectedItems, removeSelectedItem } from "../slices/MenuSlice";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
const numberToDayMapping = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Sat & Sun",
};

const ResultItem = ({
  id,
  image,
  title,
  time,
  price,
  navigation,
  servings,
  day,
}) => {
  const [checked, setChecked] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSelectedItems({ id }));
  }, []);

  useEffect(() => {
    setChecked(false);
  }, [id]);

  const handleCheckboxToggle = () => {
    setChecked(!checked); // Toggle the checkbox state

    if (!checked) {
      dispatch(removeSelectedItem({ id }));
    } else {
      dispatch(addSelectedItems({ id }));
    }
  };

  const apiUrl1 = "https://api.makeyourownmealkit.com/v1/recipes/get.php";
  function getRecipeIngredients(id) {
    return new Promise((resolve, reject) => {
      const data = new URLSearchParams();
      data.append("id", id);

      const urlWithQuery = apiUrl1 + "?" + data.toString();

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
            resolve(body.ingredients);
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
    getRecipeIngredients(id)
      .then((Response) => {
        setIngredients(Response);
      })
      .catch((error) => {
        console.error("Error fetching Response:", error);
      });
  }, []);
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
  const RenderItem = ({ key, item }) => (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 6,
            width: 6,
            borderRadius: 3,
            backgroundColor: COLORS.primaryBackground,
            marginRight: 7,
          }}
        />
        <Text style={styles.name}>{item.ingredient.name}</Text>
      </View>
      <Text style={styles.quantity}>
        {" "}
        ({item.ingredient.display_quantity}{" "}
        {getShortForm(item.ingredient.display_name)})
      </Text>
    </View>
  );

  return (
    <Pressable onPress={() => navigation.navigate("MenuItemDetail", { id })}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginVertical: 6,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              zIndex: 9,
            }}
          >
            <Text
              style={{ fontFamily: "Jost-700", fontSize: 18, color: "#756D6D" }}
            >
              {numberToDayMapping[day]}
            </Text>
            <TouchableOpacity
              onPress={handleCheckboxToggle}
              style={{ marginHorizontal: 3 }}
            >
              <View style={[styles.checkbox, checked ? styles.checked : null]}>
                {checked && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "Jost-400",
                fontSize: 10,
                color: "#1813FF",
              }}
            >
              Replace
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Jost-500",
              fontSize: 13,
              color: "#756D6D",
              flexWrap: "wrap",
              marginTop: 3,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              fontFamily: "Jost-400",
              fontSize: 16,
              color: "#393939",
              flexWrap: "wrap",
            }}
          >
            Feeds {servings}
          </Text>

          {ingredients.map((item, index) => (
            <RenderItem key={index} item={item} />
          ))}
        </View>

        <View
          style={{
            width: 30.01,
            height: 31.01,
            transform: [
              { scaleX: 2.5 },
              { scaleY: 1 },
              { rotate: "-38.02deg" },
            ],
            right: 180,
            top: 30,
            backgroundColor: COLORS.primaryBackground, // You can change the background color as desired
            borderRadius: 50, // Set the borderRadius to 50% to create a circle/oval
            position: "absolute",
            zIndex: 9,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden", // This is important to clip the rounded edges
          }}
        >
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 7,
              color: "#fff",
            }}
          >
            {price}$
          </Text>
        </View>

        <View
          style={{
            width: 200,
            borderRadius: 5,
          }}
        >
          <Image
            source={{ uri: image }} // Make sure image prop has a valid URL
            style={{
              width: "100%",
              height: 174,
              resizeMode: "cover", // Adjust the image resizing mode
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <Divider bold horizontalInset />
    </Pressable>
  );
};

export default ResultItem;

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#00000033",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  checked: {
    backgroundColor: "black",
  },
  checkmark: {
    color: "white",
    fontSize: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 11,
    fontFamily: "Jost-400",
    flexWrap: "wrap",
    color: "#756D6D",
  },
  quantity: {
    fontSize: 11,
    color: "#756D6D",
    fontFamily: "Jost-400",
  },
});
