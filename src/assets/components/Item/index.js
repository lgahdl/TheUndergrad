import React, { Component } from "react";
import { View, Text, TouchableOpacity , ActivityIndicator } from "react-native";
import ProgressiveImage from "../ProgressiveImage";

//Styles
import { globalStyles } from "../../../screens/globalStyles";
import styles from "./styles";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }
  render() {
    let p = this.props.data;
    let nav = this.props.nav;
    return (
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Details", { data: p });
        }}
        activeOpacity={0.7}
        style={styles.itemArea}
      >
        <View
          style={{
            zIndex: 1,
            top: 0,
            position: "absolute",
            height: 35,
            maxHeight: 35,
            paddingHorizontal: 10,
            width: "100%",
            backgroundColor: "#0008",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            numberOfLines={1}
            style={[globalStyles.textSemiBold, { color: "#FFF" }]}
          >
            {p.description}
          </Text>
        </View>
        <View
          style={{
            zIndex: 0,
            width: "100%",
            height: 110
          }}
        >
          <ProgressiveImage
            source={{ uri: p.pictures[0] }}
            thumbnailSource={{ uri: p.pictures[1] }}
            onLoadEnd={r => {this.setState({loading: false})}}
            style={{
              zIndex: 0,
              width: "100%",
              height: 110
            }}
          />
        </View>
        {this.state.loading ? <ActivityIndicator size="small" style={{position: "absolute"}}/> : null}
        <View
          style={{
            zIndex: 6,
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
            width: "100%",
            borderTopWidth: 1,
            borderTopColor: "#0003",
            paddingHorizontal: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
          }}
        >
          <Text style={[globalStyles.textSemiBold, { color: "#0008" }]}>
            {this.props.text.price} {Number(p.price.replace(",",".")).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Item;
