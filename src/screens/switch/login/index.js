import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

// Api
import System from "../../../services/api";

//Styles
import {
  globalStyles,
  colorsGradient,
  startGradient,
  endGradient
} from "../../globalStyles";
import styles from "./styles";

//Images
import { mainLogo } from "../../../assets/images/logo";

//Texts
import { textBr, textUsa } from "../../../assets/content/switch/login";

//Icon
import Icon from "react-native-vector-icons/FontAwesome5";

const DismissKeyboard = ({ children }) =>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      emailVerified: false,
      userUID: "",
      active: false,
      textContent: {},
      hitSlop: { bottom: 20, top: 20, right: 20, left: 20 },
      disabled: false,
      opacity: { opacity: 1 },
      loading: false
    };
  }

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

  signIn = async () => {
    Keyboard.dismiss();
    let s = this.state;
    s.loading = true;
    s.disabled = true;
    s.opacity = { opacity: 0.7 };
    this.setState(s);

    if (s.email !== "" && s.pass !== "") {
      System.addAuthListener(async user => {
        if (user) {
          s.emailVerified = user.emailVerified;
          s.userUID = user.uid;
          await AsyncStorage.setItem("userUID", user.uid);
          this.setState(s);
        }
      });
      System.login(s.email, s.pass)
      .then(async () => {
        if (s.emailVerified) {
          System.getUserInfo(s.userUID)
          .then(r => {
            s.active = r.data().active;
            this.setState(s);
          })
          .then(async () => {
            if (s.active) {
              await AsyncStorage.setItem("isOn", "true")
              .then(
                await AsyncStorage.setItem("email", s.email).then(
                  await AsyncStorage.setItem("pass", s.pass)
                )
              )
              .then(() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: "Home" })]
                });
                this.props.navigation.dispatch(resetAction);
              });
            } else {
              Alert.alert(s.textContent.titleError, s.textContent.error_4);
              s.disabled = false;
              s.loading = false;
              s.opacity = 1;
              this.setState(s);
            }
          });
        } else {
          Alert.alert(s.textContent.titleError, s.textContent.error_3);
          s.disabled = false;
          s.loading = false;
          s.opacity = 1;
          this.setState(s);
        }
        })
        .catch(err => {
          console.log(err);
          Alert.alert(s.textContent.titleError, s.textContent.error_1);
          s.disabled = false;
          s.loading = false;
          s.opacity = { opacity: 1 };
          this.setState(s);
        });
    } else {
      Alert.alert(s.textContent.titleError, s.textContent.error_2);
      s.disabled = false;
      s.loading = false;
      s.opacity = 1;
      this.setState(s);
    }
  };

  forgotPass = () => {
    this.props.navigation.navigate("ForgotPass");
  };

  regs = () => {
    this.props.navigation.navigate("Cadastro");
  };

  goBack = () => {
    this.props.navigation.navigate("Language");
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
              {/* <Transition shared="logo"> */}
                <View style={styles.logoContent}>
                  <Image style={styles.logo} source={mainLogo} />
                  <Text style={[globalStyles.textRegular, styles.mainText]}>
                    The Undergrad
                  </Text>
                </View>
              {/* </Transition> */}

              {/* <Transition disappear="left" inline={true} delay={true}> */}
                <View style={styles.inputContent}>
                  <TextInput
                    onSubmitEditing={() => this.senhaInput.focus()}
                    style={[styles.inputArea, globalStyles.textRegular]}
                    multiline={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    value={s.email}
                    onChangeText={email => {
                      this.setState({ email: email });
                    }}
                    keyboardType="email-address"
                    placeholderTextColor="#999"
                    placeholder={s.textContent.emailInput}
                  />
                  <TextInput
                    ref={input => (this.senhaInput = input)}
                    style={[styles.inputArea, globalStyles.textRegular]}
                    multiline={false}
                    autoCorrect={false}
                    returnKeyType="go"
                    value={s.pass}
                    secureTextEntry={true}
                    onSubmitEditing={this.signIn}
                    onChangeText={pass => {
                      this.setState({ pass: pass });
                    }}
                    placeholder={s.textContent.passInput}
                    placeholderTextColor="#999"
                  />
                </View>
              {/* </Transition> */}

              {/* <Transition shared="botao1"> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.buttons, s.buttonRes, s.opacity]}
                  onPress={this.signIn}
                  disabled={s.buttonDisable}
                >
                  <Text style={[globalStyles.textRegular, styles.textButton]}>
                    {s.loading
                      ? s.textContent.loading
                      : s.textContent.loginButton}
                  </Text>
                </TouchableOpacity>
              {/* </Transition> */}
              <TouchableOpacity
                hitSlop={{ bottom: 30, top: 0, right: 20, left: 20 }}
                activeOpacity={0.7}
                onPress={() => {
                  this.forgotPass;
                  this.props.navigation.navigate("ForgotPass");
                  Keyboard.dismiss();
                }}
              >
                <Text
                  style={[
                    globalStyles.textRegular,
                    { marginTop: 5, textAlign: "center" }
                  ]}
                >
                  {s.textContent.forgotPass}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.cadContent} />
          </KeyboardAvoidingView>

          <SafeAreaView>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{marginTop: -70}}
              onPress={() => {
                this.regs;
                this.props.navigation.navigate("Cadastro")
                Keyboard.dismiss();
              }}
              hitSlop={{ bottom: 20, top: 20, right: 20, left: 20 }}
            >
              <Text style={[globalStyles.textRegular, styles.cadText, {fontSize: 16}]}>
                {s.textContent.noCad}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </DismissKeyboard>
    );
  }
}
