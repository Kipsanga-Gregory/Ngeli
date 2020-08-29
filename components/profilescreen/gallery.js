import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View,
        StyleSheet,
        Text,
        Dimensions,
        Image,
        Alert
     } from 'react-native'
import { PURPLE_LIGHT_THEME } from '../../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import saveImage from '../../Common_Functions/saveImage'
import deleteImage from '../../Common_Functions/deleteImage';

const {width, height} = Dimensions.get('window')
export const Gallery = (props) => {
    const [images, setImages] = useState([...props.userdata.images])
        /* Function ran to delete an image */
    const onDeleteImagePress = async (image)=> {
        const message = await deleteImage(props.userdata, image)
        if(message == 'deleted successfully'){
            setImages([...images.filter(image=>image.image_url != image)])
        }
        console.log(message)
    }
        /* Function ran to set image as profile */
    const onSetProfilePress = ()=> {
        console.log(props.userdata.images)
    }
    const cloudinaryUpload = (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'ngeli_preset')
        data.append("cloud_name", "greglimo")
        fetch("https://api.cloudinary.com/v1_1/greglimo/image/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {
            saveImage(props.userdata, data.secure_url)
            setImages([...images, {image_url: data.secure_url, id: Math.random()}])
            // changeValue4({path: data.secure_url})
          }).catch(err => {
            console.log(`ererr ${err}`)
            Alert.alert("An Error Occured While Uploading")
          })
      }
    const onAddImagePress = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
             cropping: false
          }).then(image => {
            const source = {
              uri: image.path,
              type: image.mime,
              name: "thisimage",
            }
            cloudinaryUpload(source)
            // console.log(source);
            // changeValue4(image)
          }).catch((err) => {
            console.log(`erro is ${err}`)
          })
    }

    return (
        <View style={styles.container}>
            {
                images.map((image)=>{
                    return (
                        <View style={styles.first} key={Math.random()}>
                            <Image style={styles.images} source={{uri: image.image_url}} />
                            <View style={styles.deleteIcon}>
                                <TouchableOpacity onPress={()=> onDeleteImagePress(image.image_url)}>
                                    <Ionicons name="ios-trash" size={40} color="#ff6b6b" />                                
                                </TouchableOpacity>
                            </View>
                            <View style={styles.setProfileIcon}>
                                <TouchableOpacity onPress={()=> onSetProfilePress()}>
                                    <Ionicons name="ios-notifications-outline" size={40} color="snow" />                
                                </TouchableOpacity>                     
                            </View>
                        </View>
                    )
                })
            }
            <TouchableOpacity style={styles.addImage} onPress={()=> onAddImagePress()}>
                <Ionicons style={styles.addImageIcon} name="ios-camera" size={100} color="snow" />
            </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) =>{
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)

const styles = StyleSheet.create({
    container:{
        // backgroundColor: PURPLE_LIGHT_THEME,
        margin: 10,
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    first:{
        width: (width - 40) / 2,
        height: 160,
        borderWidth: 1,
        marginBottom: 10
        // backgroundColor: PURPLE_LIGHT_THEME
    },
    images:{
        width: (width - 40) / 2,
        height: 160
    },
    addImage:{
        width: (width - 50) / 2,
        height: 160,
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(95,39,205, 0.5)',
        // opacity: 0.4
    },
    deleteIcon:{
        position: 'absolute',
        right: 7,
        top: 5
    },
    setProfileIcon:{
        position: 'absolute',
        right: 7,
        top: 65
    }
})
