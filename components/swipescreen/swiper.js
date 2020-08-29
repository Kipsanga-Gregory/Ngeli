import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { PURPLE_LIGHT_THEME, PURPLE_INTENSE_THEME, GREEN_CHAT } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
export default class Swiper extends Component {
  constructor(){
    super()

    this.onPressChat = this.onPressChat.bind(this)
  }
  onPressChat (){
    // this.props.navigation.navigate('Convo', {name: 'Convo'})
  }
  render() {
    return (
      <View style={styles.swiper}>
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollView}>
          <View style={styles.imagewrap}>
            <Image
              style={styles.image}
              source={{uri: this.props.pic}} />
            <View style={styles.detail}>
              <Text style={styles.name}>{this.props.data.firstname}  {this.props.data.age}</Text>
              <Text style={styles.location}>{this.props.data.givenlocation}, 35km away</Text>
            </View>
            <TouchableOpacity onPress={()=>this.onPressChat()} style={styles.actionbtns}>
                <Icon name="chat" size={40} color={GREEN_CHAT} />
            </TouchableOpacity>
          </View>
          <View style={styles.infosec}>
              <View style={styles.firstV}>
                <View style={styles.kids}>
                  <Icon name="child-care" size={40} color="rgb(220,220,220)" />
                  <Text style={styles.IconLabel}>Someday</Text>
                </View>
                <View style={styles.smoke}>
                  <Icon name="smoking-rooms" size={40} color="rgb(220,220,220)" />
                  <Text style={styles.IconLabel}>No</Text>
                </View>
                <View style={styles.affiliation}>
                  <Icon name="child-care" size={40} color="rgb(220,220,220)" />
                  <Text style={styles.IconLabel}>Straight</Text>
                </View>
                <View style={styles.status}>
                  <Ionicons name="logo-no-smoking" size={40} color="rgb(220,220,220)" />
                  <Text style={styles.IconLabel}>{this.props.data.relstatus}</Text>
                </View>
              </View>
              <View style={styles.secondV}>
                <Text style={styles.label}>About...</Text>
                <Text style={styles.text}>{this.props.data.about}</Text>
              </View>
              <View style={styles.thirdV}>
                {
                  this.props.data.images.filter((image)=> {return image.is_profile != true}).map((image)=>(
                    <Image
                      key={image.id}
                      style={styles.image}
                      source={{uri: image.image_url}} 
                    />
                  ))
                }
              </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper:{
    flex: 1,
    height: height - ( ( (11/100) * (height - 47) ) + 67 ),
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    borderColor: PURPLE_INTENSE_THEME,
    // borderColor: 'rgb(174,174,174)' for the blue theme
    borderWidth: 0.8,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  imagewrap:{
    backgroundColor: '#5c4bab'
  },
  image:{
    width: null,
    height: height - ( ( (11/100) * (height - 47) ) + 67 ),
  },
  detail:{
    position: 'absolute',
    bottom: 65,
    left: 10,
    display: 'flex',
    flexDirection: 'column',
    width:width - 40
  },
  actionbtns:{
    position: 'absolute',
    bottom: 10,
    left: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 25
  },
  name:{
    alignSelf: 'center',
    color: 'rgb(220,220,220)',
    fontSize: 23,
    fontFamily: 'BalsamiqSans-Regular'
  },
  location:{
    alignSelf: 'center',
    color: 'rgb(220,220,220)',
    fontSize: 20,
    fontFamily: 'BalsamiqSans-Regular'
  },
  infosec:{
    backgroundColor: 'transparent',
  },
  infosecVimage:{
    width: null,
    height: null,
  },
  firstV:{
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(174,174,174)',
    height: 165,
    backgroundColor: PURPLE_INTENSE_THEME
  },
  kids:{
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  smoke:{
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  affiliation:{
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  status:{
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  IconLabel:{
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Regular',
    color: 'snow'
  },
  secondV:{
    marginHorizontal: 8,
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(174,174,174)',
    backgroundColor: PURPLE_INTENSE_THEME,
    padding: 8
  },
  text:{
    color: 'rgb(220,220,220)',
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Regular',
    marginLeft: 5
  },
  label:{
    color: 'rgb(220,220,220)',
    fontSize: 23,
    fontFamily: 'BalsamiqSans-BoldItalic'
  }
});
