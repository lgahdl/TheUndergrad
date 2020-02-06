import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

// Icon
import Icon from "react-native-vector-icons/FontAwesome5";

// Api
import System from "../../../../services/api";

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

class Item extends Component {
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
        <Image
          source={{ uri: p.pictures[0] }}
          style={{
            zIndex: 0,
            position: "absolute",
            width: "100%",
            height: 110,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            top: 0
          }}
        />
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
            {this.props.text.price} {Number(p.price).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: {},
      loading: true,
      itemsForSale: [],
      userInfo: {},
      userUid: ""
    };

    console.log("Books");
  }

  async componentDidMount() {
    let s = this.state;
    s.language = await AsyncStorage.getItem("language");
    s.userUid = await AsyncStorage.getItem("userUID");

    if (s.language === "br") {
      s.textContent = textBr;
    } else if (s.language === "usa") {
      s.textContent = textUsa;
    }

    this.setState(s);

    System.getUserInfo(s.userUid).then(r => {
      s.userInfo = r.data();
      this.setState(s);
      console.log(s.userInfo.university);
    });

    System.getCategories("Books")
      .then(r => {
        let data = r.docs;
        data.forEach(doc => {
          let id = doc.id;
          System.getItemsCateg(id).then(r => {
            r.forEach(doc => {
              let auxUni = doc.data().university.split("/", 3);
              let auxUserUni = s.userInfo.university.split("/", 2);
              if (auxUni[2] === auxUserUni[1]) {
                s.itemsForSale.push(doc.data());
                this.setState(s);
              } else {
                return;
              }
              console.log(auxUni[2]);
              console.log(auxUserUni[1]);
            });
          });
        });
        s.loading = false;
        this.setState(s);
        console.log(s.itemsForSale);
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
        <SafeAreaView style={styles.container}>
          <Header back={true} />
          <Text
            style={[
              globalStyles.textSemiBold,
              { marginTop: 10, textAlign: "center", fontSize: 16 }
            ]}
          >
            {s.textContent.books}
          </Text>
          {s.loading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#0008" />
            </View>
          ) : (
            <FlatList
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon name="surprise" size={50} light color="#0006" />
                  <Text style={globalStyles.textSemiBold}>
                    {s.textContent.emptyList}
                  </Text>
                </View>
              }
              style={{ marginTop: 20 }}
              data={s.itemsForSale}
              columnWrapperStyle={{ justifyContent: "space-around" }}
              numColumns={2}
              renderItem={({ item }) => (
                <Item
                  text={s.textContent}
                  data={item}
                  nav={this.props.navigation}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
