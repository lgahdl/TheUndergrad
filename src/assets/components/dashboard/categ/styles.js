import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: "100%"
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold"
  },
  categArea: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  categ: {
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    backgroundColor: "#CCC",
    width: 150,
    height: 100,
    borderRadius: 10
  },
  textCateg: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold"
  }
});

export default styles;
