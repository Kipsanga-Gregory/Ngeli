import React from 'react'
import { View, Text , Modal, StyleSheet} from 'react-native'
import { PURPLE_LIGHT_THEME } from '../constants'
import LottieView from 'lottie-react-native';

export default function Preloader(props) {
    return (
        <Modal visible={props.visible} animationType="slide" style={styles.modal} transparent={true}>
            <View style={styles.modalContent}>
                <LottieView source={require('../assets/lottie/preloader.json')} autoPlay loop style={{width: 185, height: 185}}/>
                <Text style={styles.text}>Please Wait ...</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent:{
        flex: 1,
        backgroundColor: 'rgba( 1, 21, 184 , 0.75)',
        // backgroundColor: 'rgba(61, 80, 238, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 45,
        color: 'rgb( 179, 184, 232 )',
        fontFamily: 'Tangerine-Bold'
    }
})
