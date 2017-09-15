import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

class Main extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Main',
        headerStyle: { backgroundColor: 'orange' },
        headerTintColor: 'white'
    })

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                console.log('lat ' + position.coords.latitude)
                console.log('lon ' + position.coords.longitude)
            },
            (error) => {
                console.log('error ', error.message)
            },
            {
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 10,
                enableHighAccuracy: false
            }
        )
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Main Menu</Text>
            </View>
        )
    }
}

export default Main