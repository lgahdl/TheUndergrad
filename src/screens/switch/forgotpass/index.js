import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

// Api
import System from "../../../services/api";

//Icon
import Icon from "react-native-vector-icons/FontAwesome5";

//Images
import { mainLogo } from "../../../assets/images/logo";

//Texts
import { textBr, textUsa } from "../../../assets/content/switch/forgotPass";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";

const DismissKeyboard = ({ children }) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>;

export default class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      textContent: {},
      hitSlop: { bottom: 20, top: 20, right: 20, left: 20 },
      loading: false
    };

    // System.logOut();
  }

  forgot = () => {
    let s = this.state;
    s.loading = true;
    this.setState(s);
    if (s.email !== "") {
      System.forgotPass(s.email)
        .then(r => {
          Alert.alert(s.textContent.titleError, s.textContent.suc);
          s.loading = false;
          this.props.navigation.navigate("Login");
        })
        .catch(e => {
          s.loading = false;
          Alert.alert(s.textContent.titleError, s.textContent.error_1);
        });
    } else {
      s.loading = false;
      Alert.alert(s.textContent.titleError, s.textContent.error_2);
    }
  };

  async componentWillMount() {
    let s = this.state;
    let language = await AsyncStorage.getItem("language");

    if (language === "br") {
      s.textContent = textBr;
    } else if (language === "usa") {
      s.textContent = textUsa;
    }

    this.setState(s);
  }

  goBack = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    let s = this.state;

    return (
      <DismissKeyboard>
        <LinearGradient
          colors={colorsGradient}
          start={startGradient}
          end={endGradient}
          style={globalStyles.screen}
        >
          <SafeAreaView>
            <TouchableOpacity onPress={this.goBack} style={styles.goBack}>
              <Icon name="arrow-left" size={24} color="#737373" solid />
            </TouchableOpacity>
          </SafeAreaView>
          <KeyboardAvoidingView
            enabled
            behavior="padding"
            style={styles.container}
          >
            <SafeAreaView>
              <Transition shared="logo">
                <View style={styles.logoContent}>
                  <Image style={styles.logo} source={mainLogo} />
                  <Text style={[globalStyles.textRegular, styles.mainText]}>
                    The Undergrad
                  </Text>
                </View>
              </Transition>

              <View style={styles.inputContent}>
                <Transition appear="right">
                  <TextInput
                    onSubmitEditing={this.forgot}
                    style={[styles.inputArea, globalStyles.textRegular]}
                    multiline={false}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    returnKeyType="go"
                    value={s.email}
                    onChangeText={email => {
                      this.setState({ email: email });
                    }}
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    placeholder={s.textContent.emailInput}
                  />
                </Transition>
                <Transition shared="botao1">
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.buttons}
                  onPress={this.forgot}
                >
                  <Text style={[globalStyles.textRegular, styles.textButton]}>
                    {s.loading
                      ? s.textContent.loading
                      : s.textContent.sendButton}
                  </Text>
                </TouchableOpacity></Transition>
              </View>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </DismissKeyboard>
    );
  }
}
