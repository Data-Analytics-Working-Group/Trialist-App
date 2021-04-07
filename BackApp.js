import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Evaluator from './Evaluator';
/*import DragList from './DragList';*/
import Draggable from './Draggable';
import TeamsList from './TeamsList';
import DrillsList from './DrillsList';
import Layout from './LayoutApp';
import PlayerList from './PlayerList';
import DraggableScrim from './DraggableScrim';

class StartScreen extends React.Component {
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
                    evaluator: fullname,
                    city: city
                });
            }).catch((error)=>{
                console.log('error ', error)
            })
        }
    }
    
    render() {
    
        const {navigate} = this.props.navigation;
        return (
     
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

            <Evaluator 
                handleEvaluatorData={this._writeEvaluatorData}
            />
        
            </KeyboardAvoidingView>

        )
    }
}

class DrillScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const DrillID = navigation.getParam('drill');
        const TeamID = navigation.getParam('teamKey');
        return {
        headerTitle: TeamID + ' > ' + DrillID,
        headerRight: (
            <View style={{marginRight: 5}}>
      <Button
        onPress={navigation.getParam('save')}
        title="Save"
        color="skyblue"
      />
            </View>
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
    let teamKey = this.props.navigation.getParam('teamKey');
    let drill = this.props.navigation.getParam('drill');
    let evaluator = this.props.navigation.getParam('evaluator');
        let query = evaluator + '/' + teamKey +'/'+ drill +'/';
       firebase.database().ref('tryoutResults/'+city+'/evaluatorList/'+ query).set({
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
        const team = navigation.getParam('team');
        const playerArray = Object.values(team);
        return (
<Draggable 
                players={playerArray}
                handlePlayerData={(data)=> {this.setState({ playerData: data})}} /> 
        )
    }
}
class ScrimScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        const TeamID = navigation.getParam('teamKey');
        return {
        headerTitle: TeamID,
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



_savePlayerResults = (item) => {
    let unfilteredPlayerData = item;
    const playerData = unfilteredPlayerData.filter(function(player){
        return player = player.skill != 'not-added'
    });
    let teamKey = this.props.navigation.getParam('players');
    let evaluator = this.props.navigation.getParam('evaluator');
    let query = evaluator + '/' + teamKey +'/';
    
       firebase.database().ref('tryoutResults/Furious/evaluatorList/'+ query).push({
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
        const team = navigation.getParam('team');
        const playerArray = Object.values(team);
        return (
            <DraggableScrim 
                players={playerArray}
                handlePlayerData={(data)=> {this.setState({ playerData: data})}} />

        )
    }
}
class HomeScreen extends React.Component {
        static navigationOptions = {
        title: 'Home',
        headerLeft: null,
    };
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            drillsLoaded: false,
            teams: [],
            teamNames: [],
            selectedTeam: '',
            selected: '',
            teamName: ''
        }
    }
componentDidMount(){
    firebase.database().ref('tryoutInfo/Furious/players').once('value', function (snapshot) {
        let data = snapshot.val();
    }).then( (data) => this.setState({ teams: data, isLoaded: true }));
    firebase.database().ref('tryoutInfo/Furious/drills').once('value', function (snapshot) {
        let data = snapshot.val();
    }).then( (data) => this.setState({ drills: data, drillsLoaded: true }));
}


_portalDrill = (drill) => {
    let teamKey = "Furious";
    let y = Object.keys(this.state.teams.toJSON() );
    let matches = y[index];
    this.setState({
        teamName: matches
    });
    let evaluator = this.props.navigation.getParam('evaluator');
    let city = this.props.navigation.getParam('city');
    this.props.navigation.navigate('Scrimmage', {
        teamKey: teamKey,
        team: this.state.teams,
        drill: drill,
        evaluator: evaluator,
        city: city
    })
}
_setSelectedTeam = (team, index) => {
    let y = Object.keys(this.state.teams.toJSON() );
    let matches = y[index];
    this.setState({
        selectedTeam: team,
        teamName: matches
    });
    let city = this.props.navigation.getParam('city');
   if(matches == 'scrimmage'){
       let teamKey = matches;
        let evaluator = this.props.navigation.getParam('evaluator');
        this.props.navigation.navigate('Scrimmage', {
        teamKey: teamKey,
        team: team,
        evaluator: evaluator,
        city: city
    })
}
}

    render() {

        const { navigation } = this.props;
        const evaluatorName = navigation.getParam('evaluator');
        return (
        <View style={{flex: 1, flexWrap: 'wrap'}}>
       { (this.state.drillsLoaded ) ? <DrillsList 
            drills={this.state.drills.toJSON()}
        handleDrills={this._portalDrill}
        />  : null
        }
    </View>
        )
    }
}

const AppNavigator = createStackNavigator({
    Start: {
        screen: StartScreen
    },
    Home: {
        screen: HomeScreen
    },
    Drill: {
        screen: DrillScreen
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
      flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
      paddingTop: 20
  },
    header: {
        fontSize:18
    },
    input: {
        backgroundColor: '#d3d3d3'
    },
        item: {
    padding: 10,
    fontSize: 18,
    height: 44,

  },
        oval: {
        width: 100,
        height: 50,
            marginBottom: 10,
        borderRadius: 25,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
                        flexDirection: 'row',
            flexWrap: 'wrap'
    },
    teamItem: {
        width: 100,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        padding: 20,
        fontSize: 18,
        marginBottom: 5
    }
});

