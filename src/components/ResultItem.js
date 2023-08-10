import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import { Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/COLORS";
import { useDispatch } from "react-redux";
import { addSelectedItems, removeSelectedItem } from "../slices/MenuSlice";

const ResultItem = ({ id, image, title, time, price }) => {
  const { width } = Dimensions.get("screen");
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSelectedItems({ id }));
  }, []);

  const handleCheckboxToggle = () => {
    setChecked(!checked); // Toggle the checkbox state

    if (!checked) {
      dispatch(removeSelectedItem({ id }));
    } else {
      dispatch(addSelectedItems({ id }));
    }
  };
  return (
    <View
      style={{
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 20,
        //alignItems: "flex-start",
      }}
    >
      <View>
        <View style={{ position: "absolute", zIndex: 9 }}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={handleCheckboxToggle}
            uncheckedColor={COLORS.secondaryBackground}
            color={COLORS.primaryBackground}
          />
        </View>
        <Image
          source={{ uri: image }} // Make sure image prop has a valid URL
          style={{
            width: "100%",
            height: 157,
            resizeMode: "cover", // Adjust the image resizing mode
            borderRadius: 5,
          }}
        />

        <LinearGradient
          colors={[
            "transparent",
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.8)",
            "rgba(0, 0, 0, 0.89)",
          ]} // Adjust the gradient colors and stops
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 157, // Adjust the height of the shadow gradient
            borderRadius: 5, // Match the borderRadius of the image
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "Jost-400",
          fontSize: 16,
          color: "#393939",
          letterSpacing: 2,
          marginTop: 15,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          //alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/stopwatch1.png")} // Verify the path
            style={{ width: 22, height: 22 }}
          />
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 10,
              color: "#999999",
              letterSpacing: 1,
            }}
          >
            7 steps
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/bowl1.png")} // Verify the path
            style={{ width: 22, height: 22 }}
          />
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 10,
              color: "#999999",
              letterSpacing: 1,
            }}
          >
            8 ingredients
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/clock.png")} // Verify the path
            style={{ width: 19, height: 19 }}
          />
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 10,
              color: "#999999",
              letterSpacing: 1,
            }}
          >
            {time} min
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/dollar.png")} // Verify the path
            style={{ width: 19, height: 19 }}
          />
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 10,
              color: "#999999",
              letterSpacing: 1,
            }}
          >
            ${price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ResultItem;

const styles = StyleSheet.create({});
