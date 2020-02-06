import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";

//Components
import Header from "../../../assets/components/header";

//MessagesList
import MessagesList from "./messagesList";

//TextContent
import { textBr, textUsa } from "../../../assets/content/mainRoute/messages";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: {}
    };
  }

  async componentDidMount() {
    let s = this.state;
    s.language = await AsyncStorage.getItem("language");

    if (s.language === "br") {
      s.textContent = textBr;
    } else if (s.language === "usa") {
      s.textContent = textUsa;
    }

    this.setState(s);
  }

  render() {
    let s = this.state;

    return (
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        style={globalStyles.screen}
      >
        <SafeAreaView style={styles.container}>
          <Header back={true} />
          <Text style={[globalStyles.textRegular, styles.mainText]}>
            {s.textContent.title}
          </Text>
          <View>
            <MessagesList />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
