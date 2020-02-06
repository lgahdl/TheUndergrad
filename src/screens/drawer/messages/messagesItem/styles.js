import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    justifyContent: "space-between",
    alignItems: "center"
  },
  imgProfile: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#999",
    borderWidth: 2.5,
    borderColor: "#FFF",
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontFamily: "Montserrat-SemiBold"
  },
  msg: {},
  unread:{
    position: "absolute",
    backgroundColor: "rgb(21,128,251)",
    minWidth: 20,
    height: 20,
    borderRadius: 100,
    right: 10,
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
