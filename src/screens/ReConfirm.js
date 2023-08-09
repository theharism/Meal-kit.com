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

const ReConfirm = () => {
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

      <View style={{ padding: 10, margin: 5 }}>
        <Text
          style={{
            color: "#393939",
            fontSize: 20,
            fontFamily: "Jost-500",
          }}
        >
          DO YOU STILL HAVE THESE FROM LAST TIME?
        </Text>
      </View>

      <Divider horizontalInset />
      <FlatList
        data={GroceriesItems}
        renderItem={({ item }) => (
          <GroceriesItem
            title={item.title}
            subTitle={item.subTitle}
            id={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />

      <View style={{ padding: 10, marginVertical: 5 }}>
        <Text style={{ fontFamily: "Jost-700", fontSize: 12 }}>
          We will use these ingredients in your next meal plan if you still have
          them, so please check quantity, quality, and expiration dates.{"\n"}
          {"\n"}
          <Text style={{ fontFamily: "Jost-700", fontSize: 12 }}>
            Caution:{" "}
          </Text>
          <Text style={{ fontFamily: "Jost-400-I", fontSize: 12 }}>
            Make sure these items have been stored per producer's recommendation
            and are still safe to eat. If in doubt, don’t eat them.
          </Text>
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginVertical: 15,
          marginHorizontal: 21,
          borderRadius: 5,
          height: 60,
          backgroundColor: COLORS.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000000", // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.4, // Shadow opacity
          shadowRadius: 10, // Shadow radius
          elevation: 5, // Elevation for Android
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-600",
            fontSize: 16,
            letterSpacing: 1,
            color: COLORS.primaryText,
          }}
        >
          Confirm
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReConfirm;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondaryBackground },
});
