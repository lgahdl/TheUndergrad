import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
//import { Transition, fromLeft } from "react-navigation-transitions";
import AsyncStorage from '@react-native-community/async-storage';

//Screens
import Home from "../drawer";
import Language from "../../screens/switch/language";
import Preload from "../../screens/switch/preload";
import Login from "../../screens/switch/login";
import Cadastro from "../../screens/switch/cadastro";
import ForgotPass from "../../screens/switch/forgotpass";

isSignedIn = async () => {
  const user = await AsyncStorage.getItem("language");

  return (user !== null) ? true : false;
};

const SwitchMenu = createStackNavigator(
  {
    Preload: {
      screen: Preload
    },
    Language: {
      screen: Language
    },
    Login: {
      screen: Login
    },
    Cadastro: {
      screen: Cadastro
    },
    ForgotPass: {
      screen: ForgotPass
    },
    Home: {
      screen: Home
    }
  },
  {
    mode: "screen",
    initialRouteName: "Preload",
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(SwitchMenu);
