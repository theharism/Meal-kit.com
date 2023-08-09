import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/AuthSlice";
import axios from "axios";

const Login = () => {
  const { width, height } = Dimensions.get("screen");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginButtonPressed = () => {
    setLoading(true);

    axios
      .post("http://13.50.5.218/signup", {
        user: email,
        password,
      })
      .then(function (response) {
        switch (response.status) {
          case 200:
            ToastAndroid.show("User Created", ToastAndroid.SHORT);
            const token = response.data.session.token;
            dispatch(setToken(token));
            //navigation.navigate("Home");
            break;

          case 400:
            ToastAndroid.show("Invalid username or email", ToastAndroid.SHORT);
            break;

          case 404:
            ToastAndroid.show("User not found", ToastAndroid.SHORT);
            break;

          case 401:
            ToastAndroid.show("Invalid Password", ToastAndroid.SHORT);
            break;

          default:
            ToastAndroid.show("An error occurred", ToastAndroid.SHORT);
            break;
        }
      })
      .catch(function (error) {
        ToastAndroid.show("Error 404", ToastAndroid.SHORT);
        console.log(error);
        dispatch(setToken({ token: "token" }));
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
      <StatusBar backgroundColor={COLORS.primaryBackground} />
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
              Login
            </Text>
          </View>

          <View
            style={{
              flex: 0.5,
              //backgroundColor: "black",
              marginTop: 45,
            }}
          >
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
              autoCapitalize="none"
              autoComplete="email"
              textColor={COLORS.black}
            />
            <TextInput
              label="Password"
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
              secureTextEntry={hide}
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              outlineStyle={styles.outline}
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
            <Text
              style={{
                fontFamily: "Jost-500",
                fontSize: 14,
                color: "#393939",
                alignSelf: "flex-end",
                marginRight: 10,
                marginTop: 15,
              }}
            >
              Forgot Password?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              margin: 10,
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
            onPress={loginButtonPressed}
          >
            {loading ? (
              <ActivityIndicator size={24} color={COLORS.secondaryBackground} />
            ) : (
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
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  theme: {
    colors: {
      onSurfaceVariant: "#868686",
    },
  },
});
