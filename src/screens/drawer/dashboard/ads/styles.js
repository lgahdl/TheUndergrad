import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  mainText: {
    fontSize: 18,
    textAlign: "center"
  },
  subText: {
    fontSize: 16,
    textAlign: "center"
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0
  },
  shareButton: {
    position: "absolute",
    top: 5,
    right: 5
  },
  accessBtn: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#0006",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
