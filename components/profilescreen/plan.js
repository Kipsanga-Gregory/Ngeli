import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOPacity, StyleSheet, Text, Dimensions } from 'react-native'
import { PURPLE_LIGHT_THEME } from '../../constants'

const {width, height} = Dimensions.get('window')
export const Plan = (props) => {
    const renderPlan = ()=>{
        if(props.userdata.plan == 'SU'){
            (
                <View style={styles.wrapper}>
                    <View style={styles.first}>

                    </View>
                    <View style={styles.second}>

                    </View>
                </View>
            )
        } else if(props.userdata.plan == 'pro') {
               return ( 
                    <View style={styles.wrapper}>
                        <View style={styles.first}>

                        </View>
                        <View style={styles.second}>

                        </View>
                    </View>
               )
        } else {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.first}>
                        
                    </View>
                    <View style={styles.second}>
                        
                    </View>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
        {renderPlan ()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Plan)

const styles = StyleSheet.create({
    container:{
        backgroundColor: PURPLE_LIGHT_THEME,
        margin: 20,
        marginBottom: 5,
        borderRadius: 10,
        height: 160,
        elevation: 1
    },
    wrapper:{
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    first:{
        backgroundColor: 'yellow',
        width: (width - 60) / 2 // 60 is margin R&L Plus 20 allowance
    },
    second:{
        backgroundColor: 'white'
    }
})
