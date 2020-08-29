import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions'
import { PURPLE_LIGHT_THEME, PURPLE_INTENSE_THEME, COOL_DARKGREY_TEXT, BORDER_TINT } from '../../constants';


 const Main = (props)=>{
  const onUserPressHandler = (user) =>{
        props.AddUserClicked(user)
        props.navigation.navigate('UserScreen', {name:'UserScreen'})
      }
  const renderUsers = ()=>{
        if(props.data){
          let firstBatch = props.data.length / 3
          if(props.data.length % 3 != 0){
              let firstLine = props.data.slice(0,Math.ceil(firstBatch))
              let secondLine = props.data.slice(Math.ceil(firstBatch),(Math.ceil(firstBatch)*2)-1)
              let thirdLine = props.data.slice(Math.ceil(firstBatch)*2)


            return firstLine.map((user)=>{
              return (
                <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                  <View style={styles.detailwraper}>
                    <Text style={styles.text}>{user.firstname}</Text>
                    <View style={styles.status}></View>
                  </View>
                </TouchableOpacity> 
            )})
          }else{
            let firstLine = props.data.slice(0,firstBatch)
            let secondLine = props.data.slice(firstBatch,firstBatch*2)
            let thirdLine = props.data.slice(firstBatch*2)
            return firstLine.map((user)=>{
              return (
                <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                  <View style={styles.detailwraper}>
                    <Text style={styles.text}>{user.firstname}</Text>
                    <View style={styles.status}></View>
                  </View>
                </TouchableOpacity> 
            )})
          }
        }
      }
  const renderUsers2 = ()=>{
    if(props.data){
      let firstBatch = props.data.length / 3
      if(props.data.length % 3 != 0){
          let firstLine = props.data.slice(0,Math.ceil(firstBatch))
          let secondLine = props.data.slice(Math.ceil(firstBatch),(Math.ceil(firstBatch)*2)-1)
          let thirdLine = props.data.slice(Math.ceil(firstBatch)*2)


        return secondLine.map((user)=>{
          return (
            <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
              <View style={styles.detailwraper}>
                <Text style={styles.text}>{user.firstname}</Text>
                <View style={styles.status}></View>
              </View>
            </TouchableOpacity> 
        )})
      }else{
        let firstLine = props.data.slice(0,firstBatch)
        let secondLine = props.data.slice(firstBatch,firstBatch*2)
        let thirdLine = props.data.slice(firstBatch*2)
        return secondLine.map((user)=>{
          return (
            <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
              <View style={styles.detailwraper}>
                <Text style={styles.text}>{user.firstname}</Text>
                <View style={styles.status}></View>
              </View>
            </TouchableOpacity> 
        )})
      }
    }
  }
  const renderUsers3 = ()=>{
    if(props.data){
      let firstBatch = props.data.length / 3
      if(props.data.length % 3 != 0){
          let firstLine = props.data.slice(0,Math.ceil(firstBatch))
          let secondLine = props.data.slice(Math.ceil(firstBatch),(Math.ceil(firstBatch)*2)-1)
          let thirdLine = props.data.slice(Math.ceil(firstBatch)*2)


        return thirdLine.map((user)=>{
          return (
            <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
              <View style={styles.detailwraper}>
                <Text style={styles.text}>{user.firstname}</Text>
                <View style={styles.status}></View>
              </View>
            </TouchableOpacity> 
        )})
      }else{
        let firstLine = props.data.slice(0,firstBatch)
        let secondLine = props.data.slice(firstBatch,firstBatch*2)
        let thirdLine = props.data.slice(firstBatch*2)
        return thirdLine.map((user)=>{
          return (
            <TouchableOpacity key={user.id} style={styles.userwrap} onPress={()=> onUserPressHandler(user)}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{uri: user.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
              <View style={styles.detailwraper}>
                <Text style={styles.text}>{user.firstname}</Text>
                <View style={styles.status}></View>
              </View>
            </TouchableOpacity> 
        )})
      }
    }
}

return (
  <ScrollView>
    <View style={styles.secondSection}>
      <View style={styles.firstLine}>
        {renderUsers()}
      </View>
      <View style={styles.secondLine}>
        {renderUsers2()}
      </View>
      <View style={styles.thirdLine}>
        {renderUsers3()}
      </View>
    </View>
  </ScrollView>
  );
}

const mapStateToProps = (state)=>{
  return state
}
const mapDispatchToProps = (dispatch)=>{
  return{
    AddUserClicked: (user)=>dispatch(AddUserClicked(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
  secondSection:{
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  firstLine:{
    flexDirection: 'column',
  },
  userwrap:{
    marginBottom: 20
  },
  secondLine:{
    marginTop:60
  },
  thirdLine:{

  },
  image:{
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    borderColor: 'transparent',
    borderWidth: 2,
    overflow: 'hidden'
  },
  text:{
    alignSelf: 'center',
    color: BORDER_TINT,
    fontFamily: 'BalsamiqSans-Regular',
    fontSize: 16
  },
  status:{
    alignSelf: 'center',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginLeft: 5,
    marginTop: 3
  },
  detailwraper:{
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center'
  },
});
