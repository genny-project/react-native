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

  componentDidMount() {
    console.log("did mount")
    var ws = new WebSocket('ws://bridge.outcome-hub.com/frontend');

    ws.onopen = () => {
      let payload = JSON.stringify({
        "token": "",
        "msg_type": "DATA_MSG",
        "data_type": "GPS",
        "delete": false,
        "items": [
          {
            "id": null,
            "created": "2017-09-25'T'11:2000]",
            "latitude": "-37.86330",
            "longitude": "145.0922",
            "bearing": "0",
            "targetCode": "PER_USER1"
          }
        ]
      })

      // connection opened
      ws.send(payload) // send a message
    }

    ws.onmessage = (e) => {
      // a message was received
      console.log("message ", e.data);
    }

    ws.onerror = (e) => {
      // an error occurred
      console.log("error ", e.message);
    }

    ws.onclose = (e) => {
      // connection closed
      console.log("close ", e.code, e.reason);
    }
  }

  render() {
    console.log("will render")
    const source = { uri: 'https://bouncer.outcome-hub.com/auth/realms/genny/account' }
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
