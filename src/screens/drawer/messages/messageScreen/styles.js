import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -10,
    left: 0,
    right: 0,
  },
  messageTextArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
    maxHeight: 150,
    padding: 5,
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  inputToolbar: {
    marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'grey',
        borderRadius: 25
  }
});

export default styles;
