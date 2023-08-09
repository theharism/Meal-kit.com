import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GroceriesItem } from "../components";
import { Dimensions } from "react-native";

const Groceries = () => {
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("screen");

  const addItem = () => {
    dispatch(addItem({}));
  };

  const GroceriesItems = useSelector((state) => state.Groceries);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />

      <View style={{ padding: 10, marginLeft: 5 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 32,
          }}
          onPress={() => addItem}
        >
          <Text
            style={{
              color: COLORS.secondaryText,
              fontSize: 16,
              fontFamily: "Jost-500",
            }}
          >
            Add item
          </Text>
          <AntDesign
            name="pluscircle"
            size={20}
            color={COLORS.primaryBackground}
          />
        </TouchableOpacity>
      </View>

      <Divider horizontalInset />
      <FlatList
        data={GroceriesItems}
        renderItem={({ item }) => (
          <GroceriesItem
            title={item.title}
            subTitle={item.subTitle}
            id={item.id}
            price={item.price}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={{
          margin: 10,
          borderRadius: 4,
          height: height * 0.085,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
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
    </SafeAreaView>
  );
};

export default Groceries;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryBackground },
});
