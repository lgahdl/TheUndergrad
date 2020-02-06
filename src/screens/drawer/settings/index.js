import React, { Component } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";
import System from "../../../services/api.js"

//Icon
import Icon from "react-native-vector-icons/FontAwesome5";

//Components
import Header from "../../../assets/components/header";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";

//TextContent
import { textBr, textUsa } from "../../../assets/content/mainRoute/settings";

export default class Settings extends Component {
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
          <View style={styles.options}>
            <TouchableOpacity disabled={true}>
              <Text
                style={[globalStyles.textBold, { opacity: 0.4, fontSize: 16 }]}
              >
                {s.textContent.email}{" "}
                <Text style={[globalStyles.textBold, { fontSize: 14 }]}>
                  {s.textContent.coming}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity disabled={true}>
              <Text
                style={[globalStyles.textBold, { opacity: 0.4, fontSize: 16 }]}
              >
                {s.textContent.university}{" "}
                <Text style={[globalStyles.textBold, { fontSize: 14 }]}>
                  {s.textContent.coming}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity disabled={true}>
              <Text
                style={[globalStyles.textBold, { opacity: 0.4, fontSize: 16 }]}
              >
                {s.textContent.profile}{" "}
                <Text style={[globalStyles.textBold, { fontSize: 14 }]}>
                  {s.textContent.coming}
                </Text>
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity disabled={true}>
              <Text
                style={[globalStyles.textBold, { opacity: 0.4, fontSize: 16 }]}
              >
                {s.textContent.advert}{" "}
                <Text style={[globalStyles.textBold, { fontSize: 14 }]}>
                  {s.textContent.coming}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.options, { marginTop: 10 }]}>
            <TouchableOpacity disabled={true}>
              <Text
                style={[globalStyles.textBold, { opacity: 0.4, fontSize: 16 }]}
              >
                {s.textContent.notification}{" "}
                <Text style={[globalStyles.textBold, { fontSize: 14 }]}>
                  {s.textContent.coming}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.options, { marginTop: 10 }]}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
              onPress={async () => {
                await System.logOut().then(r => {
                  const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: "Preload" })
                    ]
                  });
                  this.props.navigation.dispatch(resetAction);
                });
              }}
            >
              <Text
                style={[
                  globalStyles.textBold,
                  { fontSize: 16, color: "#ff1a1a" }
                ]}
              >
                {s.textContent.logout}
              </Text>
              <Icon name="sign-out-alt" size={24} color="#ff1a1a" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
