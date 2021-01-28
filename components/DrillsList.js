import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default class DrillsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            drillsList: [],
        }
    }
    componentDidMount(){
        let arr = this.props.drills;
        var length = Object.keys(this.props.drills).length;
        let newArr = [];
        for(var x = 0; x<length; x++){
            let obj = arr[x].name;
            newArr.push(obj);
        }
    if(this.props.drills != this.state.drillsList){
        this.setState({
            drillsList: newArr,
            });
            }
        }


    render() {
        const drillsList = this.state.drillsList;
       const Drills = (drillsList.length == 0) ? null :
       drillsList.map((item, i) =>
                    <TouchableOpacity style={{

                      width: 140,
                      height: 100,
        fontSize: 11,
        height: 40,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
        textAlign: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
                     }} 
                     key={item} onPress={()=>this.props.handleDrills(item)}>
                        <Text>{item}</Text>
                    </TouchableOpacity> 
       );
        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {Drills}
            </View>
        )
    }
}
