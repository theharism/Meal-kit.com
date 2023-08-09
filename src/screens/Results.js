import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/COLORS";
import { Dimensions } from "react-native";

const Results = () => {
  const route = useRoute();
  const { width, height } = Dimensions.get("screen");
  const response = route.params?.body;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.secondaryBackground,
      }}
    >
      <View
        style={{
          flex: 0.35,
          justifyContent: "flex-end",
          width,
          backgroundColor: COLORS.primaryBackground,
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-700",
            fontSize: 22,
            color: COLORS.primaryText,
            marginHorizontal: 10,
            marginVertical: 10,
            // marginTop: 100,
          }}
        >
          Result:
        </Text>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 5,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Jost-400",
              fontSize: 16,
              color: COLORS.primaryText,
              //marginTop: 100,
            }}
          >
            Grocery Cost:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 16,
              color: COLORS.primaryText,
              //marginTop: 100,
            }}
          >
            ${response.total_price}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 30,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Jost-400",
              fontSize: 16,
              color: COLORS.primaryText,
              //marginTop: 100,
            }}
          >
            Bonus Ingredients:{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Jost-700",
              fontSize: 16,
              color: COLORS.primaryText,
              //marginTop: 100,
            }}
          >
            $XX
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({});
