import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MenuItem = ({ id, title, time, cost, image }) => {
  return (
    <ImageBackground
      source={{
        uri: image,
      }}
      style={{
        padding: 15,
        margin: 15,
        height: 157,
        borderRadius: 5,
        justifyContent: "flex-end",
        overflow: "hidden", // To make sure the content fits within the bounds of the image
      }}
      imageStyle={{ borderRadius: 10 }} // Apply borderRadius to the image
    >
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

      <View>
        <Text
          style={{
            fontFamily: "Jost-700",
            fontSize: 16,
            letterSpacing: 3,
            color: COLORS.primaryText,
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: 130,
              justifyContent: "space-between",
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
                  color: COLORS.tertiartText,
                }}
              >
                {time} min
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
                  color: COLORS.tertiartText,
                }}
              >
                $ {cost}
              </Text>
            </View>
          </View>
          <Entypo name="dots-three-vertical" size={16} color="white" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
