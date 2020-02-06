import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    width: width,
    height: height,
    padding: 10
  },
  textRegular: {
    fontFamily: "Montserrat-Regular"
  },
  textBold: {
    fontFamily: "Montserrat-Bold"
  },
  textSemiBold: {
    fontFamily: "Montserrat-SemiBold"
  }
});

//Linear Gradient
export const colorsGradient = ["#ecf0f1", "#bdc3c7"];
export const startGradient = { x: 1, y: 0 };
export const endGradient = { x: 0, y: 1 };
