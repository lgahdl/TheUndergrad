import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { withNavigation } from "react-navigation";

//Api
import System from "../../../../services/api";

//Icons
import Icon from "react-native-vector-icons/FontAwesome5";

//Styles
import styles from "./styles";

//GlobalStyles
import { globalStyles } from "../../../globalStyles";

export class Message extends Component {
  constructor(props) {
    super(props);

    let p = this.props.data;

    this.state = {
      imageProfile: p.img,
      nome: "",
      uni: "",
      messages: [],
      lastMessage: ""
    };
  }

  messageDetail = () => {
    this.props.navigation.navigate("MessageDetail", { data: this.props.data });
  };

  componentDidMount() {
    let auxID = this.props.data.key;
    let s = this.state;
    System.getUserInfo(auxID).then(r => {
      s.nome = r.data().name;
      s.uni = r.data().email;
      let aux = s.uni.split("@", 2);
      s.uni = aux[1];
      s.imageProfile = r.data().imgProfile;
      this.setState(s);
      console.log(r.data());
    });
    // this.loadMessages()
  }

  // loadMessages = async () => {
  //   let s = this.state;
  //   let uid = await AsyncStorage.getItem("userUID");
  //   let p = this.props.data;
  //   console.log(p)

  //   System.getListaConversas(uid, async r => {
  //     s.messages = [];
  //     r.forEach(r => {
  //       if (r.key === p.key) {
  //         let messages = r.val().messages;
  //         Object.values(messages).forEach(r => {
  //           s.messages.push({
  //             hour: r.hour,
  //             user: r.user,
  //             message: r.message
  //           });
  //           console.log(r);
  //         });
  //         s.lastMessage = s.messages[s.messages.length - 1].message
  //       }
  //     });
  //     await this.setState(s);
  //   })
  // };

  render() {
    let s = this.state;

    return (
      <TouchableOpacity
        onPress={this.messageDetail}
        activeOpacity={0.7}
        style={styles.container}
      >
        <SafeAreaView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {s.imageProfile
            ? <Image
                source={{ uri: s.imageProfile }}
                style={styles.imgProfile}
              />
            : <View style={styles.imgProfile}>
                <Icon name="user" color="#FFF" size={18} solid />
              </View>}

          <View style={{ justifyContent: "flex-start", marginLeft: 20 }}>
            <Text style={[globalStyles.textRegular, styles.name]}>
              {s.nome}
            </Text>
            <Text
              style={[globalStyles.textRegular, styles.msg, { width: 100 }]}
              ellipsizeMode={"tail"}
              numberOfLines={1}
            >
              {this.props.msg}
            </Text>
          </View>
        </SafeAreaView>
        {this.props.unread != "0" &&
          <View style={styles.unread}>
            <Text
              style={{ color: "white", textAlign: "center", fontWeight: "600" }}
            >
              {this.props.unread}
            </Text>
          </View>}
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Message);
