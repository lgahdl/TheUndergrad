import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

//Styles
import styles from "./styles";

//Content
import { textBr, textUsa } from "../../../content/mainRoute/dashboard";

//Images
import { gadgets, books, furnitude, clothing } from "../../../images/categs";

export class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "",
      textContent: {}
    };
  }

  async componentWillMount() {
    let s = this.state;
    s.language = await AsyncStorage.getItem("language");

    if (s.language === "br") {
      s.textContent = textBr;
    } else if (s.language === "usa") {
      s.textContent = textUsa;
    }

    this.setState(s);
  }

  navigateTo = screen => {
    this.props.navigation.navigate(screen);
  };

  render() {
    let s = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{s.textContent.title}</Text>
        <View style={styles.categArea}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.categ}
            onPress={() => {
              this.navigateTo("Gadgets");
            }}
          >
            <Image style={styles.img} source={gadgets} />
            <Text style={styles.textCateg}>{s.textContent.gadgets}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.categ}
            onPress={() => {
              this.navigateTo("Books");
            }}
          >
            <Image style={styles.img} source={books} />
            <Text style={styles.textCateg}>{s.textContent.books}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categArea}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.categ}
            onPress={() => {
              this.navigateTo("Furniture");
            }}
          >
            <Image style={styles.img} source={furnitude} />
            <Text style={styles.textCateg}>{s.textContent.furniture}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.categ}
            onPress={() => {
              this.navigateTo("Clothing");
            }}
          >
            <Image style={styles.img} source={clothing} />
            <Text style={styles.textCateg}>{s.textContent.clothing}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(Categories);
