import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import Header from '../components/swipescreen/header'
import Swiper from '../components/swipescreen/swiper'
import MatchModal from '../components/swipescreen/modal'
import { BASE_URL, PURPLE_INTENSE_THEME, PURPLE_LIGHTER_BACKGROUND } from '../constants';

const {width, height} = Dimensions.get('window')
class SwipeScreen extends Component {

  constructor(props){
    super(props)
    
    //Bind the methods here
    this.onCrush = this.onCrush.bind(this)
    this.setModal = this.setModal.bind(this)

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      swipeDirection: "horizontal",
      currentUser: props.userdata,
      userList: [],
      modal: false
    }

    this.rotate = this.position.x.interpolate({
      inputRange:[-width/2,0,width/2],
      outputRange:['-10deg','0deg','10deg'],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange:[-width/2,0,width/2],
      outputRange:[1, 0 ,1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange:[-width/2,0,width/2],
      outputRange:[1, 0.8 ,1],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform:[
        {rotate: this.rotate},
        ...this.position.getTranslateTransform()
      ]
    }


    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder : (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3);
      },
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({x: gestureState.dx, y: 0})

      },
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx > 40){
          Animated.spring(this.position, {
            useNativeDriver: true,
            toValue: {x: width + 100, y: gestureState.dy}
          }).start(() => {
            this.setState({action: 'Crushed'})
            // right swipe action here
            this.onCrush()
            //update the state currentIndex to next card and bring onfocus
            this.setState({ currentIndex: this.state.currentIndex + 1 }, ()=>{
              this.position.setValue({ x: 0, y:0 })
            })
            
          })
        }else if(gestureState.dx < -40){
          // left swipe
            Animated.spring(this.position, {
              useNativeDriver: true,
              toValue: {x: -width - 100, y: gestureState.dy}
            }).start(() => {
              this.setState({action: 'passed'})
              // left swipe action here
              this.setState({ currentIndex: this.state.currentIndex + 1 }, ()=>{
                this.position.setValue({ x: 0, y:0 })
              })
            })
          }else{
            this.position.setValue({x:0 ,y:0 })
          }
      }
    })
  }

  componentDidMount(){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          users{
            id
            firstname
            about
            age
            gender
            occupation
            drink
            smoke
            kids
            occupation
            intrestinapp
            contacts
            password
            relstatus
            givenlocation
            livelocation
            age
            contacts
            drink
            viewedad
            plan
            online
            kids
            joined
            images {
              id
              ownerid
              is_profile
              image_url
          }
          }
        }
          `
      }
    }).then((result) => {
      if(result.data.data.users){
        this.setState({userList: this.state.userList.concat(...result.data.data.users)})
      }
    });

  }

  onCrush (){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        mutation{
          addcrush( crusherid: ${this.props.userdata.id}, crushedid: ${this.state.crushedId}) {
            crusherid
            crushedid
            reacted
            mutual
            message
          }
        }
          `
      }
  }).then((result) => {
    if(result.data.data.addcrush){
      if(result.data.data.addcrush[0].message == "Updated success, a match"){
        /* Launch Modal */
        this.setState({modal: true})
        /* Filter out party2 that matched with current user then Update the state with its details */
        let crushedPerson = this.state.userList.filter((user)=>{
          /* TODO ::: Change crushedid below to crusherid for logic correctness */
          return user.id == result.data.data.addcrush[0].crushedid
        })
        this.setState({crushedPerson: crushedPerson[0]})
      }
    }
  });
  }

  setModal (){
    this.setState({modal: false})
  }

  render() {

const renderUsers = () => {
  return this.state.userList.map((user, i)=>{
    if(i < this.state.currentIndex){
      return null
    }else if(i == this.state.currentIndex){
        //Check if state has crushedId and if it equals current focused user
      if(this.state.crushedId != user.id){
        this.setState({crushedId: user.id})
      }
      return (
        <Animated.View
          {...this.PanResponder.panHandlers}
          key={user.id}
          style={[
            this.rotateAndTranslate,
            {position: 'absolute'}
          ]} >
          <Swiper pic={user.images.filter((image)=> {return image.is_profile == true})[0].image_url} data={user} />
        </Animated.View>
      )
    }else{
      return (
        <Animated.View
          key={user.id}
          style={[{
            position: 'absolute',
            opacity: this.nextCardOpacity,
            transform:[{scale: this.nextCardScale}]
          }]} >
          <Swiper pic={user.images.filter((image)=> {return image.is_profile == true})[0].image_url} data={user}/>
        </Animated.View>
      )
    }
  }).reverse()
}

    return (
      <View style={styles.container}>
        <MatchModal visible={this.state.modal} setModal={this.setModal} crushedPerson={this.state.crushedPerson ? this.state.crushedPerson : this.props.userdata}/>
        <Header />
        <View style={styles.second}>
          {renderUsers()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    userdata : state.AuthReducer.UnregUser,
    crushedPerson: state.BrowseReducer.crushedPerson
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {

  }
}

export default connect(mapStateToProps , mapDispatchToProps)(SwipeScreen)


const styles = StyleSheet.create({
    container:{
      // flex: 1
      width: width,
      height: height,
      backgroundColor: PURPLE_LIGHTER_BACKGROUND
    },
    second:{
      flex: 1
    }
});
