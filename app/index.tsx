import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";

const index = () => {
  const nav = useNavigation();
  const navhome = () => {
    nav.navigate("home");
  };
  return (
    <View style={styles.container}>
      <Text>index yes</Text>
      <Button title="go home" onPress={() => navhome()} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
