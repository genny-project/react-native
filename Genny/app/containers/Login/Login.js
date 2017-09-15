import React, { Component } from 'react'
import { WebView } from 'react-native'

import styles from './styles'

class Login extends React.Component {

  state = { isShowingScanner: false }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerStyle: { backgroundColor: 'orange' },
    headerTintColor: 'white'
  })

  render() {
    const source = { uri: 'https://bouncer.outcome-hub.com/auth/realms/channel40/account' }
    const redirectURL = 'https://bouncer.outcome-hub.com/auth/realms/channel40/account/login-redirect?'

    // call getCurrentPosition to force Android to request access
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    )

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
