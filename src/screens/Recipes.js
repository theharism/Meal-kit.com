import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { COLORS } from "../constants/COLORS";

const Recipes = () => {
  const [meal, setMeal] = useState("");
  const [people, setPeople] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={COLORS.primaryBackground}
      />
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text variant="headlineLarge" style={styles.title}>
            Make Your Own Meal-kit.com
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Number of meals"
              value={meal}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              theme={styles.theme}
              textColor={COLORS.secondaryBackground}
              onChangeText={(meal) => setMeal(meal)}
            />
            <TextInput
              label="Number of People"
              value={people}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              theme={styles.theme}
              textColor={COLORS.secondaryBackground}
              onChangeText={(people) => setPeople(people)}
            />
            <TextInput
              label="Enter your budget"
              value={budget}
              mode="outlined"
              outlineStyle={styles.outline}
              outlineColor={COLORS.secondaryBackground}
              activeOutlineColor={COLORS.secondaryBackground}
              style={styles.input}
              onChangeText={(budget) => setBudget(budget)}
              theme={styles.theme}
              textColor={COLORS.secondaryBackground}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Recipes;

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
    height: 68,
    color: "#fff",
    fontFamily: "Jost-400",
    fontSize: 24,
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
