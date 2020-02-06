import React, { Component } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";

// API
import System from "../../../services/api";

// Images
import { mainLogo } from "../../../assets/images/logo";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";
// import AsyncStorage from "@react-native-community/async-storage";

export default class Preload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    System.isSignedIn().then((token) => {
      if (token) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        // System.logOut();
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Language" })]
        });
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render() {
    return (
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        style={globalStyles.screen}
      >
        <View style={styles.container}>
          <Image
            source={mainLogo}
            style={{ width: 1158 * 0.1, height: 810 * 0.1, marginBottom: 10 }}
          />
          <ActivityIndicator size="large" color="#1219" />
        </View>
      </LinearGradient>
    );
  }
}
