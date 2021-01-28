import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity,  ScrollView, Modal, TextInput } from 'react-native'
import DragProvider from 'react-native-useful-dnd'
 
const dragItemStyles = StyleSheet.create({
    view: {
        width: 50,
        height: 40,
        borderRadius: 25,
        padding: 5,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#444',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 5,
        marginBottom: 5
    },
    drag: {
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
    },
    dragOver: {
        borderColor: '#235789',
    },
    dropZone: {
        flex:6,
        minHeight: 100,
        minWidth: 200,
        flexDirection:'row', 
        flexWrap: 'wrap'
    },
    numMark: {
        fontWeight: 'bold', 
        fontSize: 14, 
        color: 'grey', 
        paddingLeft: 5,
        borderRightWidth: 1,
        borderRightColor: '#ddd'
        
    }
})
 
const DragItem = ({ style, drag, dragOver, ...props, }) => (
    <View {...props} style={[ dragItemStyles.view, drag && dragItemStyles.drag, dragOver && dragItemStyles.dragOver, style ]}
    >
        <Text style={{flex: 1}}>{props.name}</ Text>

    </View>
)
 
export default class Draggable extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            lastPress: 0,
            modalVisible: false,
            players: [
            ],
            selectedPlayer: '',
            comments: ''
        }
    };
    
    componentDidMount(){
        let newArr = [];
        for (let i = 0; i<this.props.players.length; i++){
            let obj = {
                name: this.props.players[i].name,
                id: this.props.players[i].id,
                skill: 'unsorted',
                comments: 'No comments'
            };
            newArr.push(obj);
        }
        this.setState({
            players: newArr
        })

    }

   setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    updatePlayerScore = (id, players, comments) => {
        let thePlayer = id;
        let theComments = comments;
        const UpdatedComments = players.map(function(player){
            return (player.id == thePlayer) ? { id: player.id, name: player.name, skill: player.skill, comments: theComments} : { id: player.id, name: player.name, skill: player.skill, comments: player.comments} ;
        });
        this.setState({
            players: UpdatedComments
        })    
        this.props.handlePlayerData(UpdatedComments);
    }
    handleDrop = (draggableId, DropZoneId) => {
        const UpdatedScore = this.state.players.map( player => {
            return (player.id == draggableId) ? { id: player.id, name: player.name, skill: DropZoneId, comments: player.comments} : { id: player.id, name: player.name, skill: player.skill, comments: player.comments} ;
        });
        this.setState({
            players: UpdatedScore
        })    
        this.props.handlePlayerData(UpdatedScore);
    }
 handleDragStart = (draggableId) =>  {  
    var delta = new Date().getTime() - this.state.lastPress;

    if(delta < 500) {
        const playerName = this.state.players.map( player => {
            return  (player.id === draggableId) ? player.name :  null
        }).filter(function(item){ 
                 return item != null
        });
        this.setState({
            selectedPlayer: draggableId,
            selectedPlayerName: playerName[0]
        })
      this.setModalVisible(!this.state.modalVisible);
    }
    this.setState({
      lastPress: new Date().getTime()
    })
  }

 
    render() {
        const _2Players = this.state.players.filter(player => {
            return player.skill == '2'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem name={player.id} />
                    </DragProvider.Draggable>
     });

        const _1Players = this.state.players.filter(player => {
            return player.skill == '1'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem name={player.id}/>
                    </DragProvider.Draggable>
     });
     const _05Players = this.state.players.filter(player => {
        return player.skill == '0.5'
    }).map((player) => {
     return <DragProvider.Draggable id={player.id} >
                    <DragItem name={player.id} />
                </DragProvider.Draggable>
 });
        const _0Players = this.state.players.filter(player => {
            return player.skill == '0'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem name={player.id} />
                    </DragProvider.Draggable>
     });
     const _Minus05Players = this.state.players.filter(player => {
        return player.skill == '-0.5'
    }).map((player) => {
     return <DragProvider.Draggable id={player.id} >
                    <DragItem name={player.id}/>
                </DragProvider.Draggable>
 });
        const _Minus1Players = this.state.players.filter(player => {
            return player.skill == '-1'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem name={player.id} />
                    </DragProvider.Draggable>
     });
        const _Minus2Players = this.state.players.filter(player => {
            return player.skill == '-2'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem name={player.id} />
                    </DragProvider.Draggable>
     });
     const UnsortedPlayers = this.state.players.filter(player => {
            return player.skill == 'unsorted'
        }).map((player) => {
         return <DragProvider.Draggable id={player.id} >
                        <DragItem color="grey" name={player.id} />
                            
                    </DragProvider.Draggable>
     });

        return (
            
<View style={{flex: 1, flexDirection: 'row'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
     <View style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
            <View 
            style={{height: 150, width: 300, marginTop: 200, backgroundColor: '#fff', flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', borderRadius: 20, borderColor: 'grey', borderWidth: 1}}>
              <Text style={{fontWeight: 'bold', 
        fontSize: 18, 
        color: 'grey', 
        paddingBottom:10}}>{this.state.selectedPlayer} - {this.state.selectedPlayerName}</Text>
            <TextInput
            style={{backgroundColor: '#e6e6e6', width: 200, padding: 6, marginBottom: 10}}
            onChangeText={ (comments)=>this.setState({comments: comments})}
            />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                this.updatePlayerScore(this.state.selectedPlayer, this.state.players, this.state.comments);
                }}>
                <Text style={{color: 'skyblue', borderColor: 'skyblue', borderRadius: 20, borderWidth: 1, padding: 6}}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    <DragProvider 
            onDragStart={this.handleDragStart}
            onDrop={this.handleDrop}> 
    <View style={{flex: 5, flexDirection: 'column', flexWrap: 'wrap'}}>
<View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <DragProvider.DropZone id="2" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', alignItems: 'center', },
                                dropOver 
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>2</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap:'wrap', height: 90}} >
                                {_2Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
<View style={{flex: 1, backgroundColor: '#fff',}}>
        <DragProvider.DropZone id="1" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver 
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>1</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', flexWrap:'wrap', height: 90}}>
                                {_1Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
            <View style={{flex: 1, backgroundColor: '#f4f4f4',}}>
        <DragProvider.DropZone id="0.5" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>0.5</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', height: 90, flexWrap:'wrap', }}>
                                {_05Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
<View style={{flex: 1, backgroundColor: '#ffffff',}}>
        <DragProvider.DropZone id="0" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>0</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', height: 90, flexWrap:'wrap', }}>
                                {_0Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
            <View style={{flex: 1, backgroundColor: '#f4f4f4',}}>
        <DragProvider.DropZone id="-0.5" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>-0.5</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', height: 90, flexWrap:'wrap', }}>
                                {_Minus05Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
<View style={{flex: 1, backgroundColor: '#fff',}}>
        <DragProvider.DropZone id="-1" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>-1</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', flexWrap:'wrap', height: 90}}>
                                {_Minus1Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
<View style={{flex: 1, backgroundColor: '#f4f4f4',}}>
        <DragProvider.DropZone id="-2" style={{flexDirection:'row', alignItems: 'flex-start' }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', },
                                dropOver
                            ]}
                        >
                        <View style={{flex: 1,justifyContent: 'center'}}>
              <Text style={dragItemStyles.numMark}>-2</Text>
            </View>
                            <View style={{flex:8, flexDirection:'row', flexWrap:'wrap', height: 90}}>
                                {_Minus2Players}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </View>
</View>
<View style={{flex:1}}>
<ScrollView style={{flex: 3, backgroundColor: '#235789', flexDirection: 'column'}}>
        <DragProvider.DropZone id="unsorted" style={{flexDirection:'row', alignItems: 'flex-start', padingLeft: 2 }}>
                    {({ dropOver, }) => (
                        <View
                            style={[
                                { flex: 1, flexDirection:'row', minHeight: 600 },
                                dropOver
                            ]}
                        >
                       
                            <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', alignItems: 'flex-start'}}>
                                {UnsortedPlayers}
                            </View>
                    </View>
                    )}
                </DragProvider.DropZone>
            </ScrollView>
</View>
        </DragProvider>
</View>
        )
    }
}

