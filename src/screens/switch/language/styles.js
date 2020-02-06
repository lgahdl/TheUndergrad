import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flagContent: {
    flexDirection: "row"
  },
  img: {
    width: 50,
    height: 50,
    margin: 10
  },
  selectedStyle: {
    borderColor: "#5cd65c",
    borderWidth: 5,
    borderRadius: 25
  },
  buttonsContent: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttons: {
    margin: 5,
    width: 200,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1219"
  },
  textButton: {
    fontSize: 16,
    color: "#FFF"
  },
  mainText: {
    fontSize: 24,
    marginBottom: 20
  },
  logoContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 131.76,
    height: 91.08
  }
});

export default styles;
