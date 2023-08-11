import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../constants/COLORS";

const GroceriesItem = ({ id, title, subTitle, price }) => {
  const [checked, setChecked] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 0,
        marginVertical: 25,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          uncheckedColor="black"
          color={COLORS.primaryBackground}
        />
        <View>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 14,
              fontFamily: "Jost-700",
              letterSpacing: 1,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 12,
              fontFamily: "Jost-400",
              color: "rgba(0,0,0,0.4)",
            }}
          >
            {subTitle} gm
          </Text>
        </View>
      </View>
      {price ? (
        <Text style={{ fontFamily: "Jost-500", fontSize: 20, marginRight: 20 }}>
          ${price}
        </Text>
      ) : null}
    </View>
  );
};

export default GroceriesItem;

const styles = StyleSheet.create({});
