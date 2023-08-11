import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { MaterialCommunityIcons, Fontisto, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
import { Modal } from "react-native";

const MenuItem = ({ id, title, time, cost, image, navigation }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MenuItemDetail", { id })}
    >
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

            <TouchableOpacity onPress={toggleDropdown}>
              <Entypo name="dots-three-vertical" size={16} color="white" />
            </TouchableOpacity>
            {isDropdownOpen && (
              // <Modal
              //   animationType="slide"
              //   transparent={true}
              //   visible={isDropdownOpen}
              // >
              //   <View style={styles.modalContainer}>
              //     <View style={styles.dropdown} key={id}>
              //       <TouchableOpacity style={styles.dropdownOption}>
              //         <Text style={styles.optionText}>Option 1</Text>
              //       </TouchableOpacity>
              //       <TouchableOpacity style={styles.dropdownOption}>
              //         <Text style={styles.optionText}>Option 2</Text>
              //       </TouchableOpacity>
              //       {/* Add more options as needed */}
              //     </View>
              //   </View>
              // </Modal>
              <View style={[styles.dropdown, styles.upwardDropdown]}>
                {/* Dropdown options */}
                <TouchableOpacity style={styles.dropdownOption}>
                  <Text style={styles.optionText}>Mark as prepared</Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity style={styles.dropdownOption}>
                  <Text style={styles.optionText}>Remove from menu</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  upwardDropdown: {
    bottom: "100%", // Position it above the item
    marginTop: -100, // Adjust the margin to create space between the button and dropdown
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    marginLeft: "auto",
  },
  dropdown: {
    position: "absolute",
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
  },
  dropdownOption: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    fontFamily: "Jost-400",
    color: "#666666",
  },
});
