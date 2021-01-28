import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, Button } from 'react-native';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "locations": [
                "Open-EAST",
                "Open-Masters-EAST",
                "Open-Masters-WEST"
            ],
            "tryoutInfo": {
                "Open-EAST": {
                    "players": [
                        {"id": "001", "name": "Akifumi Muraoka", "gender": "M"},
                        {"id": "002", "name": "Jean Guillemette", "gender": "M"},
                        {"id": "003", "name": "Dan LaFrance", "gender": "M"},
                        {"id": "004", "name": "Luc Comire", "gender": "M"},
                        {"id": "005", "name": "Philip Turner", "gender": "M"},
                        {"id": "006", "name": "Jonathan Edwards", "gender": "M"},
                        {"id": "007", "name": "Geoff Powell", "gender": "M"},
                        {"id": "008", "name": "Bretton Tan", "gender": "M"},
                        {"id": "009", "name": "Jeremy Norden", "gender": "M"},
                        {"id": "010", "name": "Nathan Hirst", "gender": "M"},
                        {"id": "011", "name": "Kieran Charnock", "gender": "M"},
                        {"id": "012", "name": "Adrian Yearwood", "gender": "M"},
                        {"id": "013", "name": "Matt O'Brien", "gender": "M"},
                        {"id": "014", "name": "Felix Marceau", "gender": "M"},
                        {"id": "015", "name": "Ben Pries", "gender": "M"},
                        {"id": "016", "name": "Tyler Sadler", "gender": "M"},
                        {"id": "017", "name": "Iain MacKenzie", "gender": "M"},
                        {"id": "018", "name": "Nigel Lendsay", "gender": "M"},
                        {"id": "019", "name": "Geoffrey Bevan", "gender": "M"},
                        {"id": "020", "name": "Jordan Vogel", "gender": "M"},
                        {"id": "021", "name": "Paul Mensah", "gender": "M"},
                        {"id": "022", "name": "Cameron Harris", "gender": "M"},
                        {"id": "023", "name": "Jacky Hau", "gender": "M"},
                        {"id": "024", "name": "Jaret Meron", "gender": "M"},
                        {"id": "025", "name": "Dave Hochhalter", "gender": "M"},
                        {"id": "026", "name": "Christophe Tremblay Jones", "gender": "M"},
                        {"id": "027", "name": "Gabriel Monfette", "gender": "M"},
                        {"id": "028", "name": "Andre Arsenault", "gender": "M"},
                        {"id": "029", "name": "Nick Boucher", "gender": "M"},
                        {"id": "030", "name": "Michael MacKenzie", "gender": "M"},
                        {"id": "031", "name": "Andrew Carroll", "gender": "M"},
                        {"id": "032", "name": "Jason Lam", "gender": "M"},
                        {"id": "033", "name": "Isaiah Masek-Kelly", "gender": "M"},
                        {"id": "034", "name": "Kyle Cantal", "gender": "M"},
                        {"id": "035", "name": "Jason Huynh", "gender": "M"},
                        {"id": "036", "name": "Jean Guillemette", "gender": "M"},
                        {"id": "037", "name": "Kevin Quinlan", "gender": "M"},
                        {"id": "038", "name": "Malik Auger-Semmar", "gender": "M"}
                    ],
                    "drills": [
                        {"id": "DR-301", "name": "1v1 Lanes (O)"},
                        {"id": "DR-302", "name": "1v1 Lanes (D)"},
                        {"id": "DR-303", "name": "3v3 Scrim (O)"},
                        {"id": "DR-304", "name": "3v3 Scrim (D)"},
                        {"id": "DR-305", "name": "Boston Drill"},
                        {"id": "DR-306", "name": "Shank Drill(O)"},
                        {"id": "DR-307", "name": "Shank Drill (D)"},
                        {"id": "DR-308", "name": "Assess the Threat (D)"},
                        {"id": "DR-309", "name": "4v4 Scrim (O)"},
                        {"id": "DR-310", "name": "4v4 Scrim (D)"},
                        {"id": "DR-311", "name": "Endzone Scrim (O)"},
                        {"id": "DR-312", "name": "Endzone Scrim (D)"},
                        {"id": "DR-313", "name": "7v7 Scrim (O)"},
                        {"id": "DR-314", "name": "7v7 Scrim (D)"}
                    ]
                },
                "Open-Masters-EAST": {
                    "players": [
                        {"id": "101", "name": "Aaron Steele", "gender": "M"},
                        {"id": "102", "name": "Alex McCardle", "gender": "M"},
                        {"id": "103", "name": "Alexandre Dion", "gender": "M"},
                        {"id": "104", "name": "Amos Lee", "gender": "M"},
                        {"id": "105", "name": "Bobby Staniforth", "gender": "M"},
                        {"id": "106", "name": "Brendan Wylie-Toal", "gender": "M"},
                        {"id": "107", "name": "Brian O'Callaghan", "gender": "M"},
                        {"id": "108", "name": "Bryce Ring", "gender": "M"},
                        {"id": "109", "name": "Chris Cowper-Smith", "gender": "M"},
                        {"id": "110", "name": "Christian Parsons", "gender": "M"},
                        {"id": "111", "name": "Dan Ellenberger", "gender": "M"},
                        {"id": "112", "name": "Dave Lepage", "gender": "M"},
                        {"id": "113", "name": "Eric Dion", "gender": "M"},
                        {"id": "114", "name": "Erik Hunter", "gender": "M"},
                        {"id": "115", "name": "Erik L'abbe", "gender": "M"},
                        {"id": "116", "name": "Felix-Antoine Daigle", "gender": "M"},
                        {"id": "117", "name": "Gavin Gray", "gender": "M"},
                        {"id": "118", "name": "Greg Dennis", "gender": "M"},
                        {"id": "119", "name": "Jake Redekopp", "gender": "M"},
                        {"id": "120", "name": "Jeff Lindquist", "gender": "M"},
                        {"id": "121", "name": "Joel Landy", "gender": "M"},
                        {"id": "122", "name": "Jonathan Haig", "gender": "M"},
                        {"id": "123", "name": "Joseph Genest", "gender": "M"},
                        {"id": "124", "name": "Kevin Jay", "gender": "M"},
                        {"id": "125", "name": "Louis-Pierre Lauson", "gender": "M"},
                        {"id": "126", "name": "Matt Berg", "gender": "M"},
                        {"id": "127", "name": "Mathieu Carpentier", "gender": "M"},
                        {"id": "128", "name": "Mathieu Desmarais", "gender": "M"},
                        {"id": "129", "name": "Mike Lee", "gender": "M"},
                        {"id": "130", "name": "Miles Wilson", "gender": "M"},
                        {"id": "131", "name": "Nathan Dandurand", "gender": "M"},
                        {"id": "132", "name": "Nathan Lam", "gender": "M"},
                        {"id": "133", "name": "Nick Cicci", "gender": "M"},
                        {"id": "134", "name": "Patrick Frisby", "gender": "M"},
                        {"id": "135", "name": "Patrick Pham", "gender": "M"},
                        {"id": "136", "name": "Pierre Girard", "gender": "M"},
                        {"id": "137", "name": "Pierre-Benoit Allard", "gender": "M"},
                        {"id": "138", "name": "Pierre-Samiel Proulx", "gender": "M"},
                        {"id": "139", "name": "Pierre-Yves Lavertu", "gender": "M"},
                        {"id": "140", "name": "Sean Bernard", "gender": "M"},
                        {"id": "141", "name": "Stephen Armitage", "gender": "M"},
                        {"id": "142", "name": "Stephen Creaser", "gender": "M"},
                        {"id": "143", "name": "TJ Reeds", "gender": "M"},
                        {"id": "144", "name": "Tyler Smith", "gender": "M"},
                        {"id": "145", "name": "Vincent Marquis", "gender": "M"},
                        {"id": "146", "name": "Yoland Fournier Cabot", "gender": "M"}
                    ],
                    "drills": [
                        {"id": "DR-001", "name": "Century Drill"},
                        {"id": "DR-002", "name": "Ladders"},
                        {"id": "DR-003", "name": "Protect Turf (D)"},
                        {"id": "DR-004", "name": "Protect Turf (Throw)"},
                        {"id": "DR-005", "name": "Reset Drill (Cut)"},
                        {"id": "DR-006", "name": "Reset Drill (D)"},
                        {"id": "DR-007", "name": "Reset Drill (Throw)"},
                        {"id": "DR-008", "name": "Breakmark Triangle (Throw)"},
                        {"id": "DR-009", "name": "Breakmark Triangle (Mark)"},
                        {"id": "DR-010", "name": "Continue Cuts (2nd O)"},
                        {"id": "DR-011", "name": "Continue Cuts (Throw)"},
                        {"id": "DR-012", "name": "Continue Cuts (2nd D)"},
                        {"id": "DR-013", "name": "Long Unders"},
                        {"id": "DR-014", "name": "Leading Outs"},
                        {"id": "DR-015", "name": "Scrimmage"}
                    ]
                },
                "Open-Masters-WEST": {
                    "players": [
                        {"id": "201", "name": "Aaron Leung", "gender": "M"},
                        {"id": "202", "name": "Allan Stonehouse", "gender": "M"},
                        {"id": "203", "name": "Carlos Ieong", "gender": "M"},
                        {"id": "204", "name": "Colin Yeung", "gender": "M"},
                        {"id": "205", "name": "Dan Bower", "gender": "M"},
                        {"id": "206", "name": "Eko Wangsawidjaya", "gender": "M"},
                        {"id": "207", "name": "Eugene Lim", "gender": "M"},
                        {"id": "208", "name": "Farouk Zaba", "gender": "M"},
                        {"id": "209", "name": "Greg Adamson", "gender": "M"},
                        {"id": "210", "name": "Ian Chan", "gender": "M"},
                        {"id": "211", "name": "Ian Hamilton", "gender": "M"},
                        {"id": "212", "name": "Jan Gorski", "gender": "M"},
                        {"id": "213", "name": "Jared Woloshyn", "gender": "M"},
                        {"id": "214", "name": "Joey Leonard", "gender": "M"},
                        {"id": "215", "name": "John Russell", "gender": "M"},
                        {"id": "216", "name": "Jon Schmidt", "gender": "M"},
                        {"id": "217", "name": "Jon Hayduk", "gender": "M"},
                        {"id": "218", "name": "Jordan Bower", "gender": "M"},
                        {"id": "219", "name": "Rolie Ryan", "gender": "M"},
                        {"id": "220", "name": "Scott Craig", "gender": "M"},
                        {"id": "221", "name": "Shawn O'Brien", "gender": "M"},
                        {"id": "222", "name": "Shawn Vogels", "gender": "M"}
                    ],
                    "drills": [
                        {"id": "DR-001", "name": "Century Drill"},
                        {"id": "DR-002", "name": "Ladders"},
                        {"id": "DR-003", "name": "Protect Turf (D)"},
                        {"id": "DR-004", "name": "Protect Turf (Throw)"},
                        {"id": "DR-005", "name": "Reset Drill (Cut)"},
                        {"id": "DR-006", "name": "Reset Drill (D)"},
                        {"id": "DR-007", "name": "Reset Drill (Throw)"},
                        {"id": "DR-008", "name": "Breakmark Triangle (Throw)"},
                        {"id": "DR-009", "name": "Breakmark Triangle (Mark)"},
                        {"id": "DR-010", "name": "Continue Cuts (2nd O)"},
                        {"id": "DR-011", "name": "Continue Cuts (Throw)"},
                        {"id": "DR-012", "name": "Continue Cuts (2nd D)"},
                        {"id": "DR-013", "name": "Long Unders"},
                        {"id": "DR-014", "name": "Leading Outs"},
                        {"id": "DR-015", "name": "Scrimmage"}
                    ]
                }

        }
    }
}

    _go = (locations) => {

        firebase.database().ref(`tryoutInfo/currentTryoutLocations/`).set({
            locations
        }).then((data)=>{
            console.log('data ', data);
        }).catch((error)=>{
            console.log('error ', error)
        })
    }
    
    render() {
               //     onPress={()=>this._go(this.state["SUN-Ottawa"].teams, this.state["SUN-Ottawa"].drills)}/>
        //    onPress={()=>this._go(this.state["SAT-Vancouver"].teams, this.state["SAT-Vancouver"].drills)}/>
        //    onPress={()=>this._go(this.state["SUN-Vancouver"].teams, this.state["SUN-Vancouver"].drills)}/>
        //    onPress={()=>this._go(this.state["SAT-Winnipeg"].teams, this.state["SAT-Winnipeg"].drills)}/>
        //    onPress={()=>this._go(this.state["SUN-Winnipeg"].teams, this.state["SUN-Winnipeg"].drills)}/>
        return (
      <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Go"
            onPress={()=>this._go(this.state.locations)}/>
            </View>

        )
    }
}