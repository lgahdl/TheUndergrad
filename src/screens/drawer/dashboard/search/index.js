import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Image,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";

import System from "../../../../services/api";

// Icon
import Icon from "react-native-vector-icons/FontAwesome5";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../../globalStyles";
import styles from "./styles";

//Texts
import {
  textBr,
  textUsa
} from "../../../../assets/content/mainRoute/dashboard";

// Components
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

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: {},
      loading: true,
      itemsForSale: [],
      userInfo: {},
      userUid: "",
      search: ""
    };
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

    System.getUserInfo(s.userUid).then(async r => {
      s.userInfo = r.data();
      await this.setState(s);
    });

    // this.search();
  }

  search = () => {
    let s = this.state;
    if (s.search == "") {
      return null;
    }
    s.loading = true;
    s.itemsForSale = [];
    this.setState(s);
    console.log(s.userInfo);

    System.getSearchItem(/*s.search*/)
      .then(r => {
        r.forEach(doc => {
          s.itemsForSale.push(doc.data());
          if(s.itemsForSale[s.itemsForSale.length - 1]["description"].toLowerCase().indexOf(s.search.toLowerCase()) == -1 ||
             s.itemsForSale[s.itemsForSale.length - 1]["university"] !== "/" + s.userInfo.university) {
              s.itemsForSale = s.itemsForSale.slice(0, s.itemsForSale.length - 1);
          }
        this.setState(s);
        });

        s.loading = false;
        // s.search = "";
        this.setState(s);
        console.log(s.itemsForSale);
      })
      .catch(e => {
        console.log(e);
      });
  };


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
          <Text style={styles.textButton}>{s.textContent.search}</Text>
          <TextInput
            value={s.search}
            onChangeText={text => {
              s.search = text;
              this.setState(s);
              this.search();
            }}
            onSubmitEditing={() => {
              this.setState({ search: "" });
              this.search();
            }}
            placeholder={s.textContent.search}
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              width: "100%",
              height: 40,
              backgroundColor: "#FFF",
              borderRadius: 5,
              marginTop: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              ...globalStyles.textRegular
            }}
          />
          {s.search != ""?(s.loading ? (
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
                    {s.textContent.items}
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
          )):null}
        </View>
      </LinearGradient>
    );
  }
}
