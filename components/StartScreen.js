import React, { Component } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

import Evaluator from './Evaluator';

export default class StartScreen extends React.Component {
    static navigationOption = {
        title: 'Welcome',
        headerLeft: 'Trialist'
    };
    constructor(props){
        super(props);
        this.state = {
            evaluator: '',
            city: ''
        }
    }

// it should display the names of the city, and then grab the repsonding data on the save
    _writeEvaluatorData = ( email, passcode, fullname, city) => {
        if(email=="" || passcode == "" || fullname == "" || city == ""){
            Alert.alert("Please complete all the fields!")
        } else {
            firebase.database().ref('tryoutResults/'+city+'/evaluatorList/'+fullname).push({
                email,
                passcode,
                fullname
            }).then((data)=>{
                this.props.navigation.navigate('Home', {
                    // pass the city name so the home screen can pull the city information
                    city: city,
                    evaluator: fullname
                });
            }).catch((error)=>{
                console.log('error ', error)
            })
        }
    }
    
    render() {
    

        return (
     
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            <Evaluator 

                handleEvaluatorData={this._writeEvaluatorData}
            />
        
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 20
    }
});