import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

import StartScreen from "./components/StartScreen";
import HomeScreen from "./components/HomeScreen";
import ScrimScreen from "./components/ScrimScreen";

const AppNavigator = createStackNavigator({
Start: {
       screen: StartScreen
       },
    Home: {
        screen: HomeScreen
    },
     Scrimmage: {
         screen: ScrimScreen
     }
});

const AppContainer =  createAppContainer(AppNavigator);


export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
