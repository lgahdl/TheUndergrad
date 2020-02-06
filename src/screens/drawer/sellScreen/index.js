import React, { Component } from "react";
import {
  Image,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";

// Api
import System from "../../../services/api";

// Modal
import Modal from "react-native-modalbox";

//Components
import Header from "../../../assets/components/header";

//TextContent
import { textBr, textUsa } from "../../../assets/content/drawer/sellScreen";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";

export default class SellScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      language: "",
      textContent: {},
      userID: "",
      categ: "",
      sellInfo: {
        category: "",
        categoryRef: "",
        createdAt: "",
        description: "",
        pictures: [],
        price: "",
        rank: "",
        university: "",
        user: "",
        userId: ""
      },
      loading: false,
      loadingImg: false,
      photo: null,
      temp: null
    };
  }

  takePhoto = async () => {
    let s = this.state;
    //let tempWindowXMLHttpRequest = window.XMLHttpRequest;
    s.userID = await AsyncStorage.getItem("userUID");
    //s.temp = tempWindowXMLHttpRequest;
    s.loadingImg = true;
    this.setState(s);

    ImagePicker.showImagePicker({}, r => {
      //window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;
      s.photo = { uri: r.uri };
      this.setState(s);
      if (r.uri) {
        let uri = r.uri.replace("file://", "");
        let mime = "image/jpeg";

        let uploadBlob = null;
        let number = null;

        RNFetchBlob.fs
          .readFile(uri, "base64")
          .then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: mime + ";BASE64"
            });
          })
          .then(blob => {
            uploadBlob = blob;
            number = Math.floor(Math.random() * 1000000000);
            console.log("Setando a imagem: " + number);
            return System.setItemImg(s.userID, blob, mime, number);
          })
          .then(() => {
            uploadBlob.close();
            //window.XMLHttpRequest = tempWindowXMLHttpRequest;
            console.log("Pegando a imagem: " + number);
            return System.getURLItemImg(s.userID, number);
          })
          .then(url => {
            let s = this.state;
            console.log(url);
            s.sellInfo.pictures = [url];
            s.loadingImg = false;
            this.setState(s);
          })
          .catch(erro => {
            console.log(erro);
            s.loadingImg = false;
            this.setState(s);
          });
      }
    });
  };

  componentWillUnmount() {
    //window.XMLHttpRequest = this.state.temp;
  }

  async componentDidMount() {
    let s = this.state;
    let date = moment().format("LLL");
    s.language = await AsyncStorage.getItem("language");
    s.userID = await AsyncStorage.getItem("userUID");

    if (s.language === "br") {
      s.textContent = textBr;
      s.categ = "Categoria";
    } else if (s.language === "usa") {
      s.textContent = textUsa;
      s.categ = "Category";
    }

    System.getUserInfo(s.userID)
      .then(r => {
        s.sellInfo.createdAt = date;
        s.sellInfo.pictures = [""];
        s.sellInfo.rank = 0;
        s.sellInfo.university = `/${r.data().university}`;
        s.sellInfo.user = `/users/${s.userID}`;
        s.sellInfo.userId = s.userID;
        console.log(r.data());
      })
      .catch(e => {
        console.log(e);
      });

    this.setState(s);
  }

  upOffer = () => {
    let s = this.state;
    s.loading = true;
    s.sellInfo.price = s.sellInfo.price.replace(",", ".");

    this.setState(s);

    let data = s.sellInfo;
    console.log(data);


    if (s.sellInfo.description !== "") {
      if (s.categ !== "Categoria" && s.categ !== "Category") {
        if (!isNaN(s.sellInfo.price)) {
          System.registerItem(data)
            .then(r => {
              Alert.alert(s.textContent.warning, s.textContent.msgWarning);
              this.props.navigation.navigate("Dashboard");
            })
            .catch(e => {
              Alert.alert(s.textContent.warning, s.textContent.msgError);
              this.props.navigation.navigate("Dashboard");
              console.log(e);
            });
        } else {
          Alert.alert(s.textContent.warning, s.textContent.msgError_4);
          s.loading = false;
          this.setState(s);
        }
      } else {
        Alert.alert(s.textContent.warning, s.textContent.msgError_2);
        s.loading = false;
        this.setState(s);
      }
    } else {
      Alert.alert(s.textContent.warning, s.textContent.msgError_3);
      s.loading = false;
      this.setState(s);
    }
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
        {/* Modal */}
        <Modal
          swipeToClose={true}
          backButtonClose={true}
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            width: "50%",
            height: "25%",
            borderRadius: 10,
            padding: 10
          }}
          ref="Categ"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              let oldData = s.sellInfo;
              this.setState({
                categ: s.language === "br" ? "Tecnologia" : "Gadgets",
                sellInfo: {
                  ...oldData,
                  category: "8PY3ZBsMlNIwhYtEwgGH",
                  categoryRef: `/categories/8PY3ZBsMlNIwhYtEwgGH`
                }
              });
              this.refs.Categ.close();
            }}
          >
            <Text
              style={[
                globalStyles.textSemiBold,
                { marginVertical: 10, fontSize: 16 }
              ]}
            >
              {s.textContent.gadgets}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              let oldData = s.sellInfo;
              this.setState({
                categ: s.language === "br" ? "Livros" : "Books",
                sellInfo: {
                  ...oldData,
                  category: "N3iUL6ynRStM5GIHpOvm",
                  categoryRef: `/categories/N3iUL6ynRStM5GIHpOvm`
                }
              });
              this.refs.Categ.close();
            }}
          >
            <Text
              style={[
                globalStyles.textSemiBold,
                { marginVertical: 10, fontSize: 16 }
              ]}
            >
              {s.textContent.books}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              let oldData = s.sellInfo;
              this.setState({
                categ: s.language === "br" ? "Roupas" : "Clothing",
                sellInfo: {
                  ...oldData,
                  category: "cKZwtt8QrAEY3xwcWUJl",
                  categoryRef: `/categories/cKZwtt8QrAEY3xwcWUJl`
                }
              });
              this.refs.Categ.close();
            }}
          >
            <Text
              style={[
                globalStyles.textSemiBold,
                { marginVertical: 10, fontSize: 16 }
              ]}
            >
              {s.textContent.clothing}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              let oldData = s.sellInfo;
              this.setState({
                categ: s.language === "br" ? "Móveis" : "Furniture",
                sellInfo: {
                  ...oldData,
                  category: "pafcKINwS2mP1AVVu49T",
                  categoryRef: `/categories/pafcKINwS2mP1AVVu49T`
                }
              });
              this.refs.Categ.close();
            }}
          >
            <Text
              style={[
                globalStyles.textSemiBold,
                { marginVertical: 10, fontSize: 16 }
              ]}
            >
              {s.textContent.furniture}
            </Text>
          </TouchableOpacity>
        </Modal>
        {/* Fim Modal */}
        <ScrollView style={styles.container}>
          <Header back={true} />
          <TouchableOpacity onPress={this.takePhoto} style={styles.uploadArea}>
            {s.photo === null ? (
              <Text style={[globalStyles.textSemiBold, styles.uploadText]}>
                {s.textContent.upImg}
              </Text>
            ) : s.loadingImg ? (
              <View
                style={{
                  backgroundColor: "#FFF4",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ActivityIndicator size="large" color="#FFF" />
              </View>
            ) : (
              <Image
                source={s.photo}
                style={{ height: "100%", width: "100%" }}
                resizeMode="stretch"
              />
            )}
          </TouchableOpacity>
          <TextInput
            multiline={false}
            maxLength={80}
            value={s.sellInfo.description}
            onChangeText={text => {
              let oldData = s.sellInfo;
              this.setState({ sellInfo: { ...oldData, description: text } });
            }}
            style={[globalStyles.textRegular, styles.description]}
            placeholder={s.textContent.description}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.refs.Categ.open();
            }}
            style={[styles.description, { justifyContent: "center" }]}
          >
            <Text style={[globalStyles.textRegular]}>{s.categ}</Text>
          </TouchableOpacity>
          <TextInput
            multiline={true}
            maxLength={150}
            value={s.sellInfo.price}
            onChangeText={text => {
              let oldData = s.sellInfo;
              this.setState({
                sellInfo: { ...oldData, price: text }
              });
            }}
            keyboardType="decimal-pad"
            style={[
              globalStyles.textRegular,
              styles.description,
              { width: "30%",
              textAlign: "center" }
            ]}
            placeholder={s.textContent.price}
          />
          <TouchableOpacity
            disabled={s.loadingImg ? false : s.loading ? s.loading : s.loading}
            activeOpacity={0.7}
            onPress={this.upOffer}
            style={styles.uploadOfferButton}
          >
            {s.loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={[globalStyles.textSemiBold, styles.uploadOffer]}>
                {s.textContent.upOffer}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  }
}
