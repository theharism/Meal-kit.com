import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants/COLORS";
import { AirbnbRating } from "@rneui/themed";
import { TextInput, Switch } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { completePurchasedRecipe } from "../slices/MenuSlice";
import { ScrollView } from "react-native";

const Rating = ({ navigation }) => {
  const [comment, setComment] = useState("");
  const { width, height } = Dimensions.get("screen");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const dispatch = useDispatch();
  const route = useRoute();
  const id = route.params?.id;

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const removeRecipe = () => {
    dispatch(completePurchasedRecipe({ id }));
    ToastAndroid.show("Recipe Completed", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.secondaryBackground,
        justifyContent: "flex-start",
      }}
    >
      <StatusBar translucent backgroundColor={COLORS.primaryBackground} />

      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "space-between" }}
        behavior={Platform.OS === "ios" ? "padding" : "null"}
        enabled
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: Platform.OS == "ios" && height,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 14,
              marginTop: 20,
            }}
          >
            <Text style={{ fontFamily: "Jost-500", fontSize: 16 }}>
              Rate your experience
            </Text>
            <AirbnbRating
              count={5}
              showRating={false}
              size={24}
              selectedColor={COLORS.primaryBackground}
            />
          </View>

          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
            placeholder="Leave a Comment"
            keyboardType="default"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 14,
            }}
          >
            <Text style={{ fontFamily: "Jost-500", fontSize: 16 }}>
              Automatically share on your feed
            </Text>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              color="black"
            />
          </View>

          <TouchableOpacity
            style={{
              margin: 10,
              marginTop: 70,
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
            onPress={removeRecipe}
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

          <View
            style={{
              width,
              marginTop: 30,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontFamily: "Jost-400", fontSize: 14, color: "#999999" }}
            >
              Your inventory will be automatically updated after this
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Rating;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 14,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: COLORS.tertiartBackground,
    padding: 10,
    fontFamily: "Jost-400",
    color: "#999999",
    fontSize: 16,
  },
});
