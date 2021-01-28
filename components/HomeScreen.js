import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';

import DrillsList from './DrillsList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
  title: `Drills Dashboard`,
  headerLeft: null,
};
constructor(props){
  super(props);
  this.state = {
      isLoaded: false,
      selected: '',
      players: {},
      drills: {}
  }
}
componentDidMount(){
   let city = this.props.navigation.getParam('city');
firebase.database().ref(`tryoutInfo/${city}/drills`).once('value', function (snapshot) {
    let data = snapshot.val();
}).then( (data) => this.setState({ drills: data, isLoaded: true  }));

firebase.database().ref(`tryoutInfo/${city}/players`).once('value', function (snapshot) {
  let data = snapshot.val();
}).then( (data) => this.setState({ players: data, city: city  }));
}


_portalDrill = (drill) => {
let evaluator = this.props.navigation.getParam('evaluator');
this.props.navigation.navigate('Scrimmage', {
  players: this.state.players,
  drill: drill,
  city: this.state.city,
  evaluator: evaluator
  
})
}

render() {

  return (
  <View style={{flex: 1, flexWrap: 'wrap'}}>
    { (this.state.isLoaded ) ? <DrillsList 
          drills={this.state.drills.toJSON()}
      handleDrills={this._portalDrill}
      />  : null
    }
</View>
  )
}
}
