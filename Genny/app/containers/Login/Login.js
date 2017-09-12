import React, { Component } from 'react'
import { WebView } from 'react-native'

import styles from './styles'

class Login extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
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
            // handle error
          },
          {
            timeout: 20000,
            maximumAge: 1000,
            distanceFilter: 10,
            enableHighAccuracy: true,
          }
        )
      }
    
      componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
      }
      
    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        )
    }
  render() {
    const source = { uri: 'https://keycloak.pleasedproperty.com.au/auth/realms/Genny/account' }
    return (
      <WebView
        source={source}
        style={styles.container}
        scrollEnabled={false}
        bounces={false}
      />
    )
  }

}

export default Login
