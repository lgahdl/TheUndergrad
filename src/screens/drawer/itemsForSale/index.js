import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";

// Api
import System from "../../../services/api";

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
import { textBr, textUsa } from "../../../assets/content/mainRoute/perfil";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userUid: "",
      textContent: {}
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
  }

  delete = async () => {
    let p = this.props.data;
    let s = this.state;
    s.userUid = await AsyncStorage.getItem("userUID");
    this.setState(s);

    let auxID = `/users/${s.userUid}`;

    System.getItemsUser(auxID)
      .then(r => {
        let data = r.docs;
        data.forEach(doc => {
          if (doc.data().createdAt === p.createdAt) {
            System.deleteItemsUser(doc.id)
              .then(r => {
                Alert.alert(
                  s.textContent.alertTitle,
                  s.textContent.alertDeleted
                );
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "Preload" })
                  ]
                });
                this.props.nav.dispatch(resetAction);
              })
              .catch(e => {
                console.log(e);
                Alert.alert(s.textContent.alertTitle, s.textContent.alertUnsuc);
              });
          }
        });
        this.setState(s);
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    let p = this.props.data;
    let nav = this.props.nav;
    let s = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            s.textContent.alertTitle,
            s.textContent.alertDesc,
            [
              {
                text: s.textContent.alertCancel,
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {
                text: s.textContent.alertConfirm,
                onPress: () => this.delete()
              }
            ],
            { cancelable: false }
          );
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

export default class ItemsForSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textContent: {},
      loading: true,
      itemsForSale: [],
      userInfo: {},
      userUid: ""
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

    System.getUserInfo(s.userUid).then(r => {
      s.userInfo = r.data();
      this.setState(s);
      console.log(s.userInfo.university);
    });

    let auxID = `/users/${s.userUid}`;

    System.getItemsUser(auxID)
      .then(r => {
        let data = r.docs;
        data.forEach(doc => {
          s.itemsForSale.push(doc.data());
          this.setState(s);
        });
        s.loading = false;
        console.log(data);
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
        {/* Modal */}

        {/* Fim Modal */}
        <View style={styles.container}>
          <Header back={true} />
          <Text
            style={[
              globalStyles.textBold,
              { fontSize: 20, marginVertical: 10, textAlign: "center" }
            ]}
          >
            {s.textContent.yourItemsFor}
          </Text>
          <View style={styles.separator} />
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
        </View>
      </LinearGradient>
    );
  }
}
