import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";

// Api
import System from "../../../../services/api";

// Icon
import Icon from "react-native-vector-icons/FontAwesome5";

// Textos
import { textBr, textUsa } from "../../../../assets/content/mainRoute/categs";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../../globalStyles";
import styles from "./styles";

//Components
import Header from "../../../../assets/components/header";

export default class Details extends Component {
  constructor(props) {
    super(props);

    let p = this.props.navigation.state.params.data;

    this.state = {
      data: p,
      photo: "",
      textContent: {},
      userInfo: {},
      sales: 0,
      sellerUID: ""
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

    let uid = s.data.user.split("/", 3);

    System.getUserInfo(uid[2])
      .then(r => {
        s.userInfo = r.data();
        s.sellerUID = uid[2];
        if (s.userInfo.imgProfile) {
          s.photo = { uri: s.userInfo.imgProfile };
        } else {
          s.photo = "";
        }
        this.setState(s);
        console.log(s.userInfo);
      })
      .catch(e => {
        console.log(e);
      });

    let auxID = `/users/${uid[2]}`;
    // console.log(auxID);

    System.getItemsUser(auxID)
      .then(r => {
        let data = r.docs.length;
        console.log(data);
        s.sales = data;
        this.setState(s);
      })
      .catch(e => {
        console.log(e);
      });
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
        <View style={styles.container}>
          <Header back={true} />
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  marginTop: 10,
                  width: "90%",
                  height: 200,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "#0006",
                  backgroundColor: "#FFF",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  source={{ uri: s.data.pictures[0] }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={[
                    globalStyles.textBold,
                    { paddingHorizontal: 20, fontSize: 18, textAlign: "center" }
                  ]}
                >
                  {s.data.description}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={globalStyles.textBold}>
                  {s.textContent.price} {Number(s.data.price).toFixed(2)}
                </Text>
              </View>
              <View style={styles.stats}>
                <View style={[styles.statsItems, { maxWidth: 75, width: 75 }]}>
                  <Text style={globalStyles.textBold}>
                    {s.textContent.sales}
                  </Text>
                  <Text style={globalStyles.textBold}>{s.sales}</Text>
                </View>
                <View style={styles.statsItems}>
                  <View style={styles.giantCircle}>
                    <View style={styles.mediumCircle}>
                      {s.photo === "" ? (
                        <Icon name="user" size={30} color="#737373" solid />
                      ) : (
                        <Image
                          style={{ width: 100, height: 100, borderRadius: 50 }}
                          source={s.photo}
                        />
                      )}
                    </View>
                  </View>
                  <Text style={[globalStyles.textBold, { fontSize: 16 }]}>
                    {s.userInfo.name}
                  </Text>
                </View>
                <View style={[styles.statsItems, { maxWidth: 75, width: 75 }]}>
                  <Text style={globalStyles.textBold}>
                    {s.textContent.star}
                  </Text>
                  <Text style={globalStyles.textBold}>{s.userInfo.rank}</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate("MessageDetail", {
                    data: { key: s.sellerUID },
                    data2: s.data
                  });
                }}
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0008",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10
                }}
              >
                <Text
                  style={[
                    globalStyles.textSemiBold,
                    { color: "#FFF", fontSize: 16 }
                  ]}
                >
                  {s.textContent.message}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
