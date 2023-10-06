import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { COLORS } from "../constants/COLORS";
import { StatusBar } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const OnBoarding = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");

  const handleTermsOfServicePress = () => {
    // Add your logic for handling Terms of Service press here
  };

  const handlePrivacyPolicyPress = () => {
    // Add your logic for handling Privacy Policy press here
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.secondaryBackground,
      }}
    >
      <StatusBar translucent backgroundColor={COLORS.primaryBackground} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 0.7,
        }}
      >
        <Image
          source={require("../../assets/icon.png")}
          style={{ width: 86, height: 86, aspectRatio: 1 }}
        />
        <Text
          style={{
            fontFamily: "Jost-700",
            fontSize: 18,
            color: COLORS.secondaryText,
            marginTop: 20,
          }}
        >
          Mealkitmaker
        </Text>
        {/* <Text
        style={{
          fontFamily: "Jost-500",
          fontSize: 14,
          color: "#666666",
          marginVertical: 25,
        }}
      >
        Continue with
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: width * 0.7,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/google.png")}
            style={{
              width: 33,
              height: 34,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/images/facebook.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/images/apple.png")}
            style={{ width: 43, height: 43 }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../assets/images/twitter.png")}
            style={{ width: 38, height: 38 }}
          />
        </TouchableOpacity>
      </View> */}

        <TouchableOpacity
          style={{
            margin: 10,
            marginTop: 30,
            borderRadius: 5,
            height: height * 0.073,
            //height: 60,
            width: width * 0.93,
            backgroundColor: COLORS.primaryBackground,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000000", // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.4, // Shadow opacity
            shadowRadius: 10, // Shadow radius
            elevation: 5, // Elevation for Android
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 16,
              letterSpacing: 1,
              color: COLORS.primaryText,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text
            style={{
              fontFamily: "Jost-600",
              fontSize: 16,
              letterSpacing: 1,
              color: COLORS.black,
              marginTop: 5,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Jost-400",
            fontSize: 10,
            textAlign: "center",
            width: width * 0.9,
          }}
        >
          By continuing you acknowledge to have read and agree with Mealkitmaker{" "}
          <TouchableOpacity onPress={handleTermsOfServicePress}>
            <Text
              style={{
                fontFamily: "Jost-500",
                fontSize: 10,
                textDecorationLine: "underline",
              }}
            >
              Terms of Service
            </Text>
          </TouchableOpacity>{" "}
          and acknowledge you’ve read our{" "}
          <TouchableOpacity onPress={handlePrivacyPolicyPress}>
            <Text
              style={{
                fontFamily: "Jost-500",
                fontSize: 10,
                textDecorationLine: "underline",
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>{" "}
          .
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({});
