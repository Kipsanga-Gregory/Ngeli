import React from 'react'
import { View, Image,TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
const ProfileView = (props) => {
    const onViewProfile = () => {
            /* Add userdata to redux for display in userscreen */
        props.AddUserClicked(props.userdata)
        props.navigation.navigate('UserScreen', {name:'UserScreen'})
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.profileLink} onPress={()=> onViewProfile()}>
                <View style={styles.addImage}>
                    <Ionicons name="ios-camera" color="snow" size={50} />
                </View>
                <Image style={styles.image} source={{uri: props.userdata.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                <View style={styles.detail}>
                    <Text style={styles.name}>{props.userdata.firstname}</Text>
                    <Text style={styles.name}>{props.userdata.age}</Text>
                </View>
                <Text style={styles.info}>Tap to see your profile</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userdata: state.AuthReducer.UnregUser
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        AddUserClicked: (user)=>dispatch(AddUserClicked(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingTop: 30
    },
    profileLink:{

    },
    detail:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    name:{
        color: '#222f3e',
        fontSize: 22,
        fontFamily: 'BalsamiqSans-Regular'
    },
    image:{
        width: width / 2,
        height: width / 2,
        borderRadius: width / 4
    },
    addImage:{
        width: 54,
        height: 54,
        alignItems: 'center',
        position: 'absolute',
        right:0,
        bottom: width / 5 - 10,
        zIndex: 5000,
        backgroundColor: '#5f27cd',
        borderRadius: 27
    },
    info:{
        color: '#222f3e',
        fontSize: 15,
        alignSelf: 'center'
    }
})
