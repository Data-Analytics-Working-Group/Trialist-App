import React, { Component } from 'react';
import { Button, Alert } from 'react-native';
import * as firebase from 'firebase';
import Draggable from './Draggable';

export default class ScrimScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const DrillID = navigation.getParam('drill');
        const city = navigation.getParam('city');
        return {
        headerTitle: `${city} > ${DrillID}`,
        headerRight: (
      <Button
        onPress={navigation.getParam('save')}
        color='skyblue'
        title="Save"
      />
    ),
            
    }
};
constructor(props){
    super(props);
    this.state = {
        playerData: []
    }
}
componentDidMount(){
    this.props.navigation.setParams({ save: () => {this._savePlayerResults(this.state.playerData) }});

}
    

_savePlayerResults = (playerData) => {
    let city = this.props.navigation.getParam('city');
    let drill = this.props.navigation.getParam('drill');
    let evaluator = this.props.navigation.getParam('evaluator');
       firebase.database().ref(`tryoutResults/${city}/evaluatorList/${evaluator}/${drill}/`).set({
           playerData
       }).then((data)=>{
           Alert.alert('Results saved!');
        }).catch((error)=>{
            console.log('error ', error)
        }).then(()=> {
                  this.props.navigation.navigate('Home')
            })
    }


_writePlayerData = (data) => {
    this.setState({
        playerData: data
    })
}

    render() {

        const { navigation } = this.props;
        const players = navigation.getParam('players');
         const json = players.toJSON();
         const playerArray = Object.values(json);

        return (
            <Draggable 
                players={playerArray}
                handlePlayerData={(data)=> {this.setState({ playerData: data})}} />

        )
    }
}