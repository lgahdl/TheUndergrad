import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Dimensions,
  Clipboard,
  Vibration,
  SafeAreaView,
  Linking
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import HeaderBackButton from "react-navigation";

const { width, height } = Dimensions.get("window");

// Icons
import Icon from "react-native-vector-icons/FontAwesome5";

//TextContent
import { textBr, textUsa } from "../../../../assets/content/mainRoute/ads";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../../globalStyles";
import styles from "./styles";

export default class Ads extends Component {
  constructor(props) {
    super(props);

    let p = this.props.navigation.state.params.data;

    this.state = {
      data: p,
      textContent: {},
      copy: false
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

  share = async () => {
    let s = this.state;
    try {
      const result = await Share.share({
        message: s.data.fullImage,
        url: s.data.fullImage
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
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
        <SafeAreaView/>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color="#737373" />
            </TouchableOpacity>

          {s.data === ""
            ? null
            : <TouchableOpacity onPress={this.share} style={styles.shareButton}>
                <Icon name="share-alt" size={24} color="#737373" />
              </TouchableOpacity>}

          {s.data === ""
            ? <View style={styles.content}>
                <Text style={[globalStyles.textSemiBold, styles.mainText]}>
                  {s.textContent.title + "\n"}
                </Text>
                <Text style={[globalStyles.textRegular, styles.subText]}>
                  {s.textContent.subTitle}
                </Text>
                <Text style={[globalStyles.textRegular, styles.subText]}>
                  {"https://theundergradstore.com\n"}
                </Text>
                <TouchableOpacity
                  style={styles.accessBtn}
                  onPress={() => {
                    Linking.openURL('https://theundergradstore.com')
                  }}
                >
                  <Text
                    style={[
                      globalStyles.textRegular,
                      styles.subText,
                      { color: "#FFF" }
                    ]}
                  >
                    {s.textContent.acess}
                  </Text>
                </TouchableOpacity>
              </View>
            : <View style={styles.content}>
                <Image
                  source={{ uri: s.data.fullImage }}
                  style={{
                    borderRadius: 5,
                    height: height - 200,
                    width: width,
                    resizeMode: "contain"
                  }}
                />
                {s.data.businessName === ""
                  ? null
                  : <Text
                      style={[
                        globalStyles.textSemiBold,
                        { marginTop: 10, fontSize: 18, marginHorizontal: 10 }
                      ]}
                    >
                      {s.data.businessName}
                    </Text>}
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => {
                    Clipboard.setString(s.data.externalLink);
                    Vibration.vibrate(500);
                    this.setState({ copy: true });
                  }}
                >
                  <Text
                    style={[
                      globalStyles.textRegular,
                      {
                        marginTop: 5,
                        fontSize: 18,
                        marginHorizontal: 10,
                        textAlign: "center"
                      }
                    ]}
                  >
                    {s.data.externalLink ? s.data.externalLink : null}
                  </Text>
                </TouchableOpacity>
                {s.copy
                  ? <Text
                      style={[
                        globalStyles.textSemiBold,
                        {
                          color: "#FFF",
                          marginTop: 5,
                          backgroundColor: "#00000080",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 20,
                          textAlign: "center"
                        }
                      ]}
                    >
                      {s.textContent.copy}
                    </Text>
                  : null}
              </View>}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
