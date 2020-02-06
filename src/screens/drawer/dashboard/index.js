import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

// Modal
import Modal from "react-native-modalbox";

//Components
import Header from "../../../assets/components/header";
import SearchBar from "../../../assets/components/searchBar";
import Categories from "../../../assets/components/dashboard/categ";

//TextContent
import { textBr, textUsa } from "../../../assets/content/mainRoute/dashboard";

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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      active: false,
      unreadMessages: 0,
      textContent: {},
      data: [],
      spotOne: "",
      spotTwo: "",
      spotTree: "",
      spotFour: "",
      spotFive: "",
      spotSix: "",
      spotSeven: "",

      // Uni Initials
      uniInitials: "",

      // Disable Button
      disable: true,
      loading: true
    };
  }

  async componentDidMount() {
    let s = this.state;
    s.language = await AsyncStorage.getItem("language");
    s.uid = await AsyncStorage.getItem("userUID");
    this.setState(s);

    System.getUserInfo(s.uid).then(r => {
      s.active = r.data().active;
      this.setState(s);
    })
    .then(() => {
      if(!System.isSignedIn() || !s.active) {
        System.logOut();
        this.props.navigation.navigate("Language")
      } 
    });

    if (s.language === "br") {
      s.textContent = textBr;
    } else if (s.language === "usa") {
      s.textContent = textUsa;
    }

    this.getInfo();

    System.getListaConversas(s.uid, async r => {
      s.unreadMessages = 0
      r.forEach(r => {
        s.unreadMessages += r.val().unreadMessages;
      });
      this.setState(s)
    });
  }

  getInfo = async () => {
    console.log("rodou")
    let s = this.state;
    let uid = await AsyncStorage.getItem("userUID");

    System.getUserInfo(uid).then(r => {
      console.log(r.data());
      let uni = r.data().university.split("/", 2);
      console.log(uni);
      let newUni = uni[1];
      System.getUniData(newUni).then(r => {
        let initials = r.data().initials;
        console.log(initials);
        this.getADS(initials);
      });
    });
  };

  getADS = initials => {
    let s = this.state;

    System.getADS(initials)
      .then(r => {
        s.data = r.docs;
        this.checkADS(r);
      })
      .catch(e => {
        console.log(e);
      });
  };

  checkADS = r => {
    let s = this.state;
    let date = new Date();
    console.log(date);

    r.forEach(doc => {
      let data = doc.data();
      console.log(data.dueDate);
      if (data.dueDate >= date) {
        // console.log(data);
        if (data.spot === 1) {
          s.spotOne = data;
          this.setState(s);
        } else if (data.spot === 2) {
          s.spotTwo = data;
          this.setState(s);
        } else if (data.spot === 3) {
          s.spotTree = data;
          this.setState(s);
        } else if (data.spot === 4) {
          s.spotFour = data;
          this.setState(s);
        } else if (data.spot === 5) {
          s.spotFive = data;
          this.setState(s);
        } else if (data.spot === 6) {
          s.spotSix = data;
          this.setState(s);
        } else if (data.spot === 7) {
          s.spotSeven = data;
          this.setState(s);
        } else {
          return;
        }
      }
    });

    this.setState({ disable: false, loading: false });
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
        <SafeAreaView style={styles.container}>
          <Header unread={this.state.unreadMessages}/>
          <SearchBar />
          <ScrollView>
            <Categories />
            <View style={styles.filterBar}>
              <Text style={styles.filterText}>{s.textContent.filter}</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.boxOne}>
                <View style={styles.boxOneSub}>
                  <TouchableOpacity
                    disabled={s.disable}
                    onPress={() => {
                      this.props.navigation.navigate("Ads", {
                        data: s.spotOne
                      });
                    }}
                    activeOpacity={0.7}
                    style={[styles.one, styles.boxStyle]}
                  >
                    {s.loading ? (
                      <ActivityIndicator size="small" color="#0002" />
                    ) : s.spotOne === "" ? (
                      <Text style={{ color: "#0009" }}>
                        {s.textContent.spot}
                      </Text>
                    ) : (
                      <Image
                        source={{ uri: this.state.spotOne.image }}
                        style={styles.imgsADS}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={s.disable}
                    onPress={() => {
                      this.props.navigation.navigate("Ads", {
                        data: s.spotTwo
                      });
                    }}
                    activeOpacity={0.7}
                    style={[styles.two, styles.boxStyle]}
                  >
                    {s.loading ? (
                      <ActivityIndicator size="small" color="#0002" />
                    ) : s.spotTwo === "" ? (
                      <Text style={{ color: "#0009" }}>
                        {s.textContent.spot}
                      </Text>
                    ) : (
                      <Image
                        source={{ uri: this.state.spotTwo.image }}
                        style={styles.imgsADS}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.boxOneSub}>
                  <TouchableOpacity
                    disabled={s.disable}
                    onPress={() => {
                      this.props.navigation.navigate("Ads", {
                        data: s.spotTree
                      });
                    }}
                    activeOpacity={0.7}
                    style={[styles.tree, styles.boxStyle]}
                  >
                    {s.loading ? (
                      <ActivityIndicator size="small" color="#0002" />
                    ) : s.spotTree === "" ? (
                      <Text style={{ color: "#0009" }}>
                        {s.textContent.spot}
                      </Text>
                    ) : (
                      <Image
                        source={{ uri: this.state.spotTree.image }}
                        style={styles.imgsADS}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.boxTwo}>
                <TouchableOpacity
                  disabled={s.disable}
                  onPress={() => {
                    this.props.navigation.navigate("Ads", { 
                      data: s.spotFour
                    });
                  }}
                  activeOpacity={0.7}
                  style={[styles.four, styles.boxStyle]}
                >
                  {s.loading ? (
                    <ActivityIndicator size="small" color="#0002" />
                  ) : s.spotFour === "" ? (
                    <Text style={{ color: "#0009" }}>{s.textContent.spot}</Text>
                  ) : (
                    <Image
                      source={{ uri: this.state.spotFour.image }}
                      style={styles.imgsADS}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.boxTree}>
                <View style={styles.boxTwoSub}>
                  <TouchableOpacity
                    disabled={s.disable}
                    onPress={() => {
                      this.props.navigation.navigate("Ads", {
                        data: s.spotFive
                      });
                    }}
                    activeOpacity={0.7}
                    style={[styles.five, styles.boxStyle]}
                  >
                    {s.loading ? (
                      <ActivityIndicator size="small" color="#0002" />
                    ) : s.spotFive === "" ? (
                      <Text style={{ color: "#0009" }}>
                        {s.textContent.spot}
                      </Text>
                    ) : (
                      <Image
                        source={{ uri: this.state.spotFive.image }}
                        style={styles.imgsADS}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.boxTwoSub}>
                  <TouchableOpacity
                    disabled={s.disable}
                    onPress={() => {
                      this.props.navigation.navigate("Ads", {
                        data: s.spotSix
                      });
                    }}
                    activeOpacity={0.7}
                    style={[styles.six, styles.boxStyle]}
                  >
                    {s.loading ? (
                      <ActivityIndicator size="small" color="#0002" />
                    ) : s.spotSix === "" ? (
                      <Text style={{ color: "#0009" }}>
                        {s.textContent.spot}
                      </Text>
                    ) : (
                      <Image
                        source={{ uri: this.state.spotSix.image }}
                        style={styles.imgsADS}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.boxFour}>
                <TouchableOpacity
                  disabled={s.disable}
                  onPress={() => {
                    this.props.navigation.navigate("Ads", {
                      data: s.spotSeven
                    });
                  }}
                  activeOpacity={0.7}
                  style={[styles.seven, styles.boxStyle]}
                >
                  {s.loading ? (
                    <ActivityIndicator size="small" color="#0002" />
                  ) : s.spotSeven === "" ? (
                    <Text style={{ color: "#0009" }}>{s.textContent.spot}</Text>
                  ) : (
                    <Image
                      source={{ uri: this.state.spotSeven.image }}
                      style={styles.imgsADS}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
