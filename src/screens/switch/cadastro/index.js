import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackActions, NavigationActions } from "react-navigation";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import {  Transition } from "react-navigation-fluid-transitions";

// Api
import System from "../../../services/api";

//Images
import { mainLogo } from "../../../assets/images/logo";

//Icon
import Icon from "react-native-vector-icons/FontAwesome5";

//Texts
import { textBr, textUsa } from "../../../assets/content/switch/cadastro";

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

export default class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tel: "1",
      email: "",
      pass: "",
      repPass: "",
      userUID: "",
      uniID: "",
      universityName: "",
      university: "",
      data: {},
      textContent: {},
      correctPass: {},
      buttonRes: {},
      buttonDisable: true,
      opacity: { opacity: 1 },
      loading: false
    };

    // System.logOut();
  }

  register = async () => {
    let s = this.state;
    let date = moment().format("LLL");
    s.buttonDisable = true;
    s.loading = true;
    s.opacity = { opacity: 0.7 };
    s.data = {
      rank: 0,
      totalRank: 0,
      sales: 0,
      name: s.name,
      email: s.email,
      phone: s.tel,
      uid: s.userUID,
      active: true,
      createdAt: date,
      university: s.university,
      universityName: s.universityName
    };
    await this.setState(s);

    if (
      s.name !== "" &&
      s.tel !== "" &&
      s.email !== "" &&
      s.pass !== "" &&
      s.repPass !== ""
    ) {
      System.addAuthListener(user => {
        if (user) {
          let oldData = s.data;
          s.userUID = user.uid;
          s.data = { ...oldData, uid: user.uid };
          this.setState(s);
          user.sendEmailVerification();
        }
      });

      System.register(s.email, s.pass)
        .then(async r => {
          if (s.userUID != "") {
            System.registerOnFirestore(s.userUID, s.data)
              .then(async r => {
                Alert.alert(s.textContent.titleError, s.textContent.suc);
                // await AsyncStorage.setItem("userUID", s.userUID);
                // await AsyncStorage.setItem("isOn", "true").then(
                //   await AsyncStorage.setItem("email", s.email).then(
                //     await AsyncStorage.setItem("pass", s.pass).then(() => {
                      const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({ routeName: "Login" })
                        ]
                      });
                      this.props.navigation.dispatch(resetAction);
                //     })
                //   )
                // );
              })
              .catch(err => {});
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.message)
          if(err.message == "The email address is already in use by another account.") {Alert.alert(s.textContent.titleError, s.textContent.error_5);};
          Alert.alert(s.textContent.titleError, s.textContent.error_1);
          s.buttonDisable = false;
          s.loading = false;
          s.opacity = { opacity: 1 };
          this.setState(s);
        });
    } else {
      Alert.alert(s.textContent.titleError, s.textContent.error_2);
      s.buttonDisable = false;
      s.loading = false;
      s.opacity = { opacity: 1 };
      this.setState(s);
    }
  };

  goBack = () => {
    this.props.navigation.navigate("Login");
  };

  checkUni = () => {
    let s = this.state;
    s.buttonDisable = true;
    s.loading = true;
    s.opacity = { opacity: 0.7 };
    this.setState(s);

    let uniDomain = s.email.split("@", 2);

    uniDomain[1] = uniDomain[1] == "poli.ufrj.br" ? "ufrj.br" : uniDomain[1];

    if (s.pass.length < 6) {
      Alert.alert(s.textContent.titleError, s.textContent.error_4);
    } else {
      System.checkUni(uniDomain[1])
        .then(r => {
          if (r.docs.length !== 0) {
            s.uniID = r.docs[0].ref.id;
            s.university = r.docs[0].ref.path;
            System.getUniData(r.docs[0].ref.id)
              .then(r => {
                let data = r.data();
                s.universityName = data.name;
                s.data.universityName = data.name;
                this.setState(s);
                this.register();
              })
              .catch(e => {
                Alert.alert(s.textContent.titleError, s.textContent.error_3);
                s.buttonDisable = false;
                s.loading = false;
                s.opacity = { opacity: 1 };
                this.setState(s);
              });
          } else {
            Alert.alert(s.textContent.titleError, s.textContent.error_3);
            s.buttonDisable = false;
            s.loading = false;
            s.opacity = { opacity: 1 };
            this.setState(s);
          }
        })
        .catch(error => {
          Alert.alert(s.textContent.titleError, s.textContent.error_3);
          s.buttonDisable = false;
          s.loading = false;
          s.opacity = { opacity: 1 };
          this.setState(s);
        });
    }
  };

  checkPass = repPass => {
    let s = this.state;
    if (repPass === s.pass && repPass !== "" && s.pass !== "") {
      s.correctPass = { borderWidth: 2, borderColor: "#5cd65c" };
      s.buttonRes = { backgroundColor: "#1219" };
      s.buttonDisable = false;
    } else if (repPass !== s.pass && repPass !== "") {
      s.correctPass = { borderWidth: 2, borderColor: "#ff4d4d" };
      s.buttonRes = { backgroundColor: "#ff4d4d" };
      s.buttonDisable = true;
    } else {
      s.correctPass = {};
      s.buttonRes = {};
      s.buttonDisable = true;
    }

    this.setState(s);
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
            <SafeAreaView style={styles.cadastroContent}>
              {/* <Transition shared="logo"> */}
                <View style={styles.logoContent}>
                  <Image style={styles.logo} source={mainLogo} />
                  <Text style={[globalStyles.textRegular, styles.mainText]}>
                    The Undergrad
                  </Text>
                </View>
              {/* </Transition> */}
              {/* <Transition appear="right"> */}
                <View style={styles.inputContent}>
                  <TextInput
                    onSubmitEditing={() => this.emailInput.focus()}
                    autoCapitalize="words"
                    style={[styles.inputArea, globalStyles.textRegular]}
                    multiline={false}
                    autoCorrect={false}
                    returnKeyType="next"
                    value={s.name}
                    onChangeText={name => {
                      this.setState({ name: name });
                    }}
                    keyboardType="default"
                    placeholderTextColor="#999"
                    placeholder={s.textContent.nameInput}
                  />
                  <TextInput
                    onSubmitEditing={() => this.senhaInput.focus()}
                    ref={input => (this.emailInput = input)}
                    style={[styles.inputArea, globalStyles.textRegular]}
                    autoCapitalize="none"
                    multiline={false}
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
                    onSubmitEditing={() => this.reSenhaInput.focus()}
                    ref={input => (this.senhaInput = input)}
                    style={[
                      styles.inputArea,
                      globalStyles.textRegular,
                      s.correctPass
                    ]}
                    multiline={false}
                    autoCorrect={false}
                    returnKeyType="next"
                    value={s.pass}
                    secureTextEntry={true}
                    onChangeText={pass => {
                      this.setState({ pass: pass });
                    }}
                    placeholderTextColor="#999"
                    placeholder={s.textContent.passInput}
                  />
                  <TextInput
                    onSubmitEditing={() => this.checkUni()}
                    ref={input => (this.reSenhaInput = input)}
                    style={[
                      styles.inputArea,
                      globalStyles.textRegular,
                      s.correctPass
                    ]}
                    multiline={false}
                    autoCorrect={false}
                    returnKeyType="go"
                    value={s.repPass}
                    secureTextEntry={true}
                    onChangeText={repPass => {
                      this.checkPass(repPass);
                      this.setState({ repPass: repPass });
                    }}
                    placeholderTextColor="#999"
                    placeholder={s.textContent.repPassInput}
                  />
                </View>
              {/* </Transition> */}
              {/* <Transition shared="botao1"> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[styles.buttons, s.buttonRes, s.opacity]}
                  onPress={this.checkUni}
                  disabled={s.buttonDisable}
                >
                  <Text style={[globalStyles.textRegular, styles.textButton]}>
                    {s.loading
                      ? s.textContent.loading
                      : s.textContent.cadButton}
                  </Text>
                </TouchableOpacity>
              {/* </Transition> */}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </DismissKeyboard>
    );
  }
}
