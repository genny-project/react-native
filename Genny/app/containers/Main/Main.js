import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { GennyBridge } from '../../utils/genny'

import styles from './styles'

class Main extends React.Component {

    state = {
        latitude: 0,
        longitude: 0
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Main',
        headerStyle: { backgroundColor: 'orange' },
        headerTintColor: 'white'
    })

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
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
                <Text>{this.state.latitude + ', ' + this.state.longitude}</Text>
            </View>
        )
    }
}

export default Main