import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 131.76,
    height: 91.08
  },
  mainText: {
    fontSize: 24,
    marginBottom: 10
  },
  goBack: {
    alignSelf: "flex-start"
  },
  inputContent: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputArea: {
    backgroundColor: "#FFF",
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    width: 225
  },
  buttons: {
    margin: 5,
    width: 225,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1219"
  },
  textButton: {
    fontSize: 16,
    color: "#FFF"
  }
});

export default styles;
