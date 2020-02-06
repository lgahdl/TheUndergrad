import React, { Component } from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { withNavigation } from "react-navigation";

//Styles
import styles from "./styles";

//Texts
import { textBr, textUsa } from "../../content/mainRoute/dashboard";

export class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: {}
    };
  }

  async componentWillMount() {
    let s = this.state;
    let language = await AsyncStorage.getItem("language");

    if (language === "br") {
      s.textContent = textBr;
    } else if (language === "usa") {
      s.textContent = textUsa;
    }

    this.setState(s);
  }

  render() {
    let s = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Search");
          }}
          activeOpacity={0.4}
          style={styles.button}
        >
          <Text style={styles.textButton}>{s.textContent.search}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default withNavigation(SearchBar);
