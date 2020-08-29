import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions'
import { COOL_DARKGREY_TEXT, PURPLE_LIGHT_THEME, PURPLE_INTENSE_THEME, BORDER_TINT } from '../../constants';

const Popular = (props) =>{


    const onPopularPress = (item) => {
      props.AddUserClicked(item)

      props.navigation.navigate('UserScreen', {name: 'UserScreen'})
    }
    return (
      <View style={styles.firstSection}>
        <ScrollView
          horizontal={true}>
          <View style={styles.addSelf}>
            <Image
              style={{width: 80, height: 100}}
              source={require('../../assets/images/IMG-20190916-WA0001.jpg')} />
          </View>
          <View style={styles.sectionDesc}>
            <Text style={styles.desc}>Most Popular Ngeliers</Text>
          </View>
          <View style={styles.popular}>
            {
              props.data.map((item, index)=>{
                return (
                  <TouchableOpacity key={index} onPress={()=>onPopularPress(item)}>
                  <Image
                    style={{width: 100, height: 90, borderRadius: 10, marginHorizontal: 4}}
                    source={{uri: item.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Popular)

const styles = StyleSheet.create({
  firstSection:{
    height: 100,
    borderBottomWidth: 1,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: BORDER_TINT,
    // backgroundColor: BORDER_TINT
  },
  popular:{
    height: 90,
    margin: 5,
    flexDirection: 'row'
  },
  addSelf:{
    height: 90,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  sectionDesc:{
    height: 90,
    width: 105,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden'
  },
  desc:{
    color: BORDER_TINT,
    fontSize: 21,
    fontFamily: 'BalsamiqSans-Regular'
  },
});
