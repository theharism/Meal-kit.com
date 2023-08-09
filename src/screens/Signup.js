import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { TextInput, Checkbox } from "react-native-paper";
import axios from "axios";

const Signup = ({ navigation }) => {
  const { width, height } = Dimensions.get("screen");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const url = "api.makeyourownmealkit.com";

  const signupButtonPress = async () => {
    setLoading(true);

    axios
      .post("http://13.50.5.218/signup", {
        username,
        name,
        email,
        password,
      })
      .then(function (response) {
        switch (response.status) {
          case 200:
            ToastAndroid.show("User Created", ToastAndroid.SHORT);
            //navigation.navigate("Home");
            break;

          case 400:
            ToastAndroid.show("Invalid username or email", ToastAndroid.SHORT);
            break;

          case 409:
            ToastAndroid.show(
              "Username or email not available",
              ToastAndroid.SHORT
            );
            break;

          case 500:
            ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
            break;

          default:
            break;
        }
      })
      .catch(function (error) {
        ToastAndroid.show("Error 404", ToastAndroid.SHORT);
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.secondaryBackground,
      }}
    >
      <StatusBar translucent backgroundColor={COLORS.primaryBackground} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flex: 1,
            //backgroundColor: "red",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              //backgroundColor: "yellow",
              justifyContent: "center",
              flex: 0.3,
            }}
          >
            <Text
              style={{
                fontFamily: "Jost-700",
                fontSize: 48,
                color: "#393939",
              }}
            >
              Signup
            </Text>
          </View>

          <View
            style={{
              flex: 0.5,
              marginTop: 45,
            }}
          >
            <TextInput
              label="Name"
              style={{
                width: width * 0.95,
                backgroundColor: "#F7F7F7",
                borderRadius: 10,
                marginVertical: 5,
                height: 55,
              }}
              contentStyle={{
                fontFamily: "Jost-500",
                height: 60,
                fontSize: 16,
              }}
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={"#868686"}
              theme={styles.theme}
              textColor={COLORS.black}
              autoComplete="name"
            />
            <TextInput
              label="Username"
              style={{
                width: width * 0.95,
                backgroundColor: "#F7F7F7",
                borderRadius: 10,
                marginVertical: 5,
                height: 55,
              }}
              contentStyle={{
                fontFamily: "Jost-500",
                height: 60,
                fontSize: 16,
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={"#868686"}
              theme={styles.theme}
              textColor={COLORS.black}
              autoComplete="name"
            />
            <TextInput
              label="Email"
              keyboardType="email-address"
              style={{
                width: width * 0.95,
                backgroundColor: "#F7F7F7",
                borderRadius: 10,
                marginVertical: 5,
                height: 55,
              }}
              contentStyle={{
                fontFamily: "Jost-500",
                height: 60,
                fontSize: 16,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={"#868686"}
              theme={styles.theme}
              textColor={COLORS.black}
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextInput
              label="Password"
              style={{
                width: width * 0.95,
                backgroundColor: "#F7F7F7",
                borderRadius: 10,
                height: 55,
                marginVertical: 5,
              }}
              contentStyle={{
                fontFamily: "Jost-500",
                height: 60,
                fontSize: 16,
              }}
              secureTextEntry={hide}
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={"#868686"}
              theme={styles.theme}
              textColor={COLORS.black}
              right={
                hide ? (
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setHide(!hide)}
                    style={{ marginTop: 20 }}
                  />
                ) : (
                  <TextInput.Icon
                    icon="eye-off"
                    onPress={() => setHide(!hide)}
                    style={{ marginTop: 20 }}
                  />
                )
              }
            />
          </View>
          <View style={{ margin: 10 }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={COLORS.primaryBackground}
              />
              <Text
                style={{
                  fontFamily: "Jost-400",
                  fontSize: 16,
                  color: COLORS.secondaryText,
                }}
              >
                I agree with{" "}
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Jost-500",
                      fontSize: 16,
                      textDecorationLine: "underline",
                      color: COLORS.secondaryText,
                    }}
                  >
                    terms
                  </Text>
                </TouchableOpacity>{" "}
                and{" "}
                <TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Jost-500",
                      fontSize: 16,
                      textDecorationLine: "underline",
                      color: COLORS.secondaryText,
                    }}
                  >
                    conditions
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 5,
                height: 60,
                width: width * 0.95,
                backgroundColor: COLORS.primaryBackground,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000000", // Shadow color
                shadowOffset: { width: 0, height: 2 }, // Shadow offset
                shadowOpacity: 0.4, // Shadow opacity
                shadowRadius: 10, // Shadow radius
                elevation: 5, // Elevation for Android
              }}
              onPress={signupButtonPress}
            >
              {loading ? (
                <ActivityIndicator
                  size={24}
                  color={COLORS.secondaryBackground}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "Jost-600",
                    fontSize: 16,
                    letterSpacing: 1,
                    color: COLORS.primaryText,
                  }}
                >
                  Signup
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  theme: {
    colors: {
      onSurfaceVariant: "#868686",
    },
  },
});
