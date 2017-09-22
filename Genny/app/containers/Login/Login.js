import React, { Component } from 'react'
import { Platform, Button, WebView } from 'react-native'

import styles from './styles'

class Login extends React.Component {

  state = { isShowingScanner: false }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'orange' },
    headerRight: (<Button
      title='Go To Main'
      onPress={() => {
        const route = (Platform.OS === 'ios') ? 'iOSScanner' : 'AndroidScanner'
        const { navigate } = navigation
        navigate(route)
        }
      }
    />)
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
        scalesPageToFit={false}
        onNavigationStateChange={(state) => {
          const { url } = state
          const willRedirect = url.includes(redirectURL)
          const { isShowingScanner } = this.state

          if (willRedirect && !isShowingScanner) {
            const { navigate } = this.props.navigation
            navigate('AndroidScanner')
            this.setState({ isShowingScanner: true })
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
          const { url } = request
          const willRedirect = url.includes(redirectURL)

          if (willRedirect) {
            const { navigate } = this.props.navigation
            navigate('iOSScanner')
          }

          return !willRedirect
        }}
      />
    )
  }

}

export default Login
