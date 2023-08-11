import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/COLORS";
import { useDispatch } from "react-redux";
import { ToastAndroid } from "react-native";
import { addItem } from "../slices/GroceriesSlice";

const CustomBottomSheet = ({ assetBottomSheet }) => {
  const snapPoints = useMemo(() => ["40%", "80%"], []);
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();

  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={-1}
      ref={assetBottomSheet}
      backgroundStyle={{ backgroundColor: COLORS.primaryBackground }}
      handleStyle={{
        backgroundColor: COLORS.primaryBackground,
        borderRadius: 10,
      }}
      handleIndicatorStyle={{ backgroundColor: COLORS.secondaryBackground }}
    >
      <View style={{ flex: 1, marginTop: 10, marginHorizontal: 10 }}>
        <TextInput
          label="Item Title"
          value={title}
          mode="outlined"
          outlineStyle={styles.outline}
          outlineColor={COLORS.secondaryBackground}
          activeOutlineColor={COLORS.secondaryBackground}
          style={styles.input}
          theme={styles.theme}
          textColor={COLORS.secondaryBackground}
          onChangeText={(title) => setTitle(title)}
          contentStyle={{
            fontFamily: "Jost-400",
            fontSize: 16,
          }}
        />
        <TextInput
          label="Item Price"
          value={price}
          mode="outlined"
          keyboardType="number-pad"
          outlineStyle={styles.outline}
          outlineColor={COLORS.secondaryBackground}
          activeOutlineColor={COLORS.secondaryBackground}
          style={styles.input}
          theme={styles.theme}
          textColor={COLORS.secondaryBackground}
          onChangeText={(price) => setPrice(price)}
          contentStyle={{
            fontFamily: "Jost-400",
            fontSize: 16,
          }}
        />
        <TextInput
          label="Item Quantity"
          value={quantity}
          mode="outlined"
          keyboardType="number-pad"
          outlineStyle={styles.outline}
          outlineColor={COLORS.secondaryBackground}
          activeOutlineColor={COLORS.secondaryBackground}
          style={styles.input}
          theme={styles.theme}
          textColor={COLORS.secondaryBackground}
          onChangeText={(quantity) => setQuantity(quantity)}
          contentStyle={{
            fontFamily: "Jost-400",
            fontSize: 16,
          }}
        />

        <Button
          mode="contained"
          style={{
            backgroundColor: COLORS.secondaryBackground,
            marginTop: 20,
            paddingVertical: 0,
            width: "80%",
            height: 45,
            alignSelf: "center",
          }}
          textColor={COLORS.secondaryText}
          labelStyle={{ fontSize: 17, fontFamily: "Jost-400" }}
          onPress={() => {
            if (
              title.length > 2 &&
              parseFloat(price) > 0 &&
              parseFloat(quantity) > 0
            ) {
              dispatch(addItem({ name: title, price, grams: quantity }));
              assetBottomSheet.current.close();
            } else
              ToastAndroid.show("Enter Correct Values", ToastAndroid.SHORT);
          }}
        >
          Add Item
        </Button>
      </View>
    </BottomSheet>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBackground,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    color: COLORS.primaryText,
    textAlign: "center",
    marginBottom: 50,
    fontFamily: "Jost-800",
    fontSize: 30,
    letterSpacing: 2,
  },
  inputContainer: {
    justifyContent: "space-between",
    flex: 0.1,
    marginBottom: 60,
  },
  outline: {
    borderWidth: 3,
  },
  theme: {
    colors: {
      onSurfaceVariant: "white",
    },
  },
  input: {
    backgroundColor: COLORS.primaryBackground,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.secondaryBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 68,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.secondaryText,
    fontSize: 24,
    fontFamily: "Jost-700",
  },
});
