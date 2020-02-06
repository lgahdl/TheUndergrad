import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  goBack: {
    alignSelf: "flex-start"
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
  cadastroContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  inputContent: {
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
  textButton: {
    fontSize: 16,
    color: "#FFF"
  },
  buttons: {
    margin: 5,
    width: 225,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1212"
  }
});

export default styles;
