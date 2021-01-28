import React, { Component } from 'react';
import { Text, View, Button, Picker, TextInput } from 'react-native';

import * as firebase from 'firebase';

export default class Evaluator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullname:'',
            passcode:'',
            city: '',
            isLoaded: false,
            firebaseData: []
        }
    }
    componentWillMount(){
        firebase.database().ref(`tryoutInfo/currentTryoutLocations/locations`).once('value', function (snapshot) {
            let data = snapshot.val();
        }).then( (data) => {
            let newData = Object.values(data.toJSON() );
            this.setState({ 
                firebaseData: newData, 
                isLoaded: true  
            });
            });
        }
        _handleCitySelection = (city) => {
            if(city != "null"){
                this.setState({
                    city: city
                });
            }
        }

    render() {
        return (
        <View style={{width: 300}}>
            <Text>Full Name</Text>
            <TextInput
                style={{backgroundColor: '#e6e6e6', marginBottom: 10, padding: 5}}
                onChangeText={ (fullname)=>this.setState({fullname})}
            />
        <Text>Email</Text>
            <TextInput
                keyboardType='email-address'
                style={{backgroundColor: '#e6e6e6', marginBottom: 10, padding: 5}}
                onChangeText={ (email)=>this.setState({email})}
            />
        <Text>Passcode</Text>
            <TextInput
                style={{backgroundColor: '#e6e6e6', marginBottom: 10, padding: 5}}
                onChangeText={ (passcode)=>this.setState({passcode})}
            />
        { (this.state.isLoaded ) ? 
            <Picker
                style={{marginBottom: 10, padding:5}} 
                selectedValue = {this.state.city} 
                onValueChange = {this._handleCitySelection}
                >
            <Picker.Item label="Please choose your tryout" value="null" />
            { this.state.firebaseData.map( (item)  => {
                return (
            <Picker.Item label={item} value={item} />
                )
            }
            )
            }           
            </Picker>
            : null
      }

        <Button
            color= 'skyblue'
            title="Submit"
            onPress={()=>{
            this.props.handleEvaluatorData(this.state.email, this.state.passcode, this.state.fullname, this.state.city)
        }}
            />
        </View>
        )
    }
}