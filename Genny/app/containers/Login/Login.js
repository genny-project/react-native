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
