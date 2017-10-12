import React, { Component } from 'react'
import { Platform, Button, WebView } from 'react-native'

import styles from './styles'

class Login extends React.Component {

  state = { isShowingScanner: false }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerTintColor: 'green',
    headerStyle: { backgroundColor: 'white' },
    headerRight: (
      <Button
        title='Go To Main'
        onPress={() => {
          const route = (Platform.OS === 'ios') ? 'iOSScanner' : 'AndroidScanner'
          const { navigate } = navigation
          navigate(route)
        }
        }
      />
    )
  })

  render() {
    console.log("will render")
    const source = { uri: 'http://localhost:3000' }
    const redirectURL = 'https://bouncer.outcome-hub.com/auth/realms/genny/account/login-redirect?'

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
