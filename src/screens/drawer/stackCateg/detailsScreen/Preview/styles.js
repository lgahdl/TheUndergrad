import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  SafeAreaView: {
    zIndex: 1,
    position: "absolute"
  },
  foto: {
    zIndex: 0,
    width: "100%",
    height: "100%"
  },
  activity: {
    zIndex: 2,
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
