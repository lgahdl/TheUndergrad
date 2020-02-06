import React, { Component } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import System from '../../../services/api'

//Styles
import styles from "./styles";

//Icons
import Icon from "react-native-vector-icons/FontAwesome5";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      back: this.props.back,
      msg: this.props.back,
      categs: this.props.categ,
      hitSlop: { top: 20, bottom: 20, left: 20, right: 20 }
    };
  }

  navMessage = () => {
    this.props.navigation.navigate("Messages");
  };

  navProfile = () => {
    this.props.navigation.navigate("Perfil");
  };

  render() {
    let s = this.state;

    return (
      <View style={styles.areaContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {s.back ? (
            <TouchableOpacity
              hitSlop={s.hitSlop}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-left" size={24} color="#737373" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              hitSlop={s.hitSlop}
              activeOpacity={0.5}
              onPress={this.navProfile}
            >
              <Icon name="user-alt" size={24} color="#737373" />
            </TouchableOpacity>
          )}

          {s.msg || s.categs ? null : (
            <TouchableOpacity
              hitSlop={s.hitSlop}
              activeOpacity={0.5}
              onPress={this.navMessage}
            >
              <Icon name="comment-alt" size={24} color={this.props.unread ? "rgb(21,128,251)" : "#737373"} solid />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.title}>The Undergrad</Text>
      </View>
    );
  }
}

export default withNavigation(Header);
