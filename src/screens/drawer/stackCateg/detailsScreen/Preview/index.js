import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import PhotoView from "react-native-photo-view";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";

export default class Details extends Component {
  constructor(props) {
    super(props);

    let p = this.props.navigation.state.params.foto;

    this.state = {
      foto: p.pictures[0],
      loading: true
    };
  }

  render() {
    let s = this.state;
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <SafeAreaView style={styles.SafeAreaView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.goBack()}
          >
            <Icon
              name="times"
              size={30}
              color="#AAA"
              solid
              style={{ left: 15 }}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <PhotoView
          source={{ uri: s.foto }}
          style={styles.foto}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onLoadEnd={r => {this.setState({loading: false})}}
        />
        {this.state.loading
          ? <View style={styles.activity}><ActivityIndicator size="large" style={{ position: "absolute" }} /></View>
          : null}
      </View>
    );
  }
}
