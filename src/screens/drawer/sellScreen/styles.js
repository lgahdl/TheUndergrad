import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  uploadArea: {
    marginTop: 10,
    height: 200,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#bfbfbf",
    borderColor: "#b3b3b3",
    borderWidth: 5,
    borderRadius: 5
  },
  uploadText: {
    color: "#737373",
    fontSize: 16
  },
  description: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCC",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%",
    minHeight: 40,
    maxHeight: 150,
    textAlign: "justify",
    backgroundColor: "#FFF"
  },
  uploadOffer: {
    color: "#FFF",
    fontSize: 20
  },
  uploadOfferButton: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
    width: "80%",
    height: 60,
    backgroundColor: "#737373",
    borderRadius: 10
  }
});

export default styles;
