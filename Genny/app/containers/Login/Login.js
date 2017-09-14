import React, { Component } from 'react'
import { WebView } from 'react-native'

import styles from './styles'

class Login extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerStyle: { backgroundColor: 'orange' },
    headerTintColor: 'white'
  })

  render() {
    const source = { uri: 'https://bouncer.outcome-hub.com/auth/realms/channel40/account' }

    return (
      <WebView
        source={source}
        style={styles.container}
        scalesPageToFit={false}
        onNavigationStateChange={(state) => {
          const { url } = state
          const willRedirect = url.includes('login-redirect?')
          
          if (willRedirect) {
            const { navigate } = this.props.navigation
            navigate('Main')
          }

          return !willRedirect
        }}
        onShouldStartLoadWithRequest={(request) => {
          const { url } = request
          const willRedirect = url.includes('login-redirect?')
          
          if (willRedirect) {
            const { navigate } = this.props.navigation
            navigate('Main')
          }

          return !willRedirect
        }}
      />
    )
  }
}

export default Login
