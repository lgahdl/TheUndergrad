import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

//Components
import Header from "../../../assets/components/header";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";

export default class BuyScreen extends Component {
  render() {
    return (
      <LinearGradient
        colors={colorsGradient}
        start={startGradient}
        end={endGradient}
        style={globalStyles.screen}
      >
        <SafeAreaView style={{ flex: 1 }} />
      </LinearGradient>
    );
  }
}
