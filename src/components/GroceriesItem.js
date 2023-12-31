import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox } from "react-native-paper";
import { COLORS } from "../constants/COLORS";
import {
  addSelectedIngredients,
  removeSelectedIngredients,
} from "../slices/GroceriesSlice";
import { useDispatch } from "react-redux";
import { CheckBox } from "@rneui/themed";

const GroceriesItem = ({ id, title, subTitle, price, unit }) => {
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxToggle = () => {
    const temp = !checked;
    setChecked(!checked); // Toggle the checkbox state

    if (temp) {
      dispatch(addSelectedIngredients({ id }));
    } else {
      dispatch(removeSelectedIngredients({ id }));
    }
  };

  useEffect(() => {
    setChecked(false);
  }, [id]);

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
        <CheckBox
          checked={checked}
          onPress={handleCheckboxToggle}
          uncheckedColor={COLORS.primaryBackground}
          checkedColor={COLORS.primaryBackground}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          wrapperStyle={{
            width: 10,
            height: 25,
          }}
          center
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
            {subTitle} {unit}
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
