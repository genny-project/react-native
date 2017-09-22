import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Main from './containers/Main'
import Login from './containers/Login'
import FingerprintScannerIOS from './containers/FingerprintScannerIOS'
import FingerprintScannerAndroid from './containers/FingerprintScannerAndroid'
import store from './store/configureStore'
import codePush from 'react-native-code-push'

const Stack = StackNavigator({
  Login: { screen: Login },
  Main: { screen: Main },
  iOSScanner: { screen: FingerprintScannerIOS },
  AndroidScanner: { screen: FingerprintScannerAndroid}
})

const HomeInAStackWithStore = () => (
  <Provider store={store}>
    <Stack />
  </Provider>
)

HomeInAStackWithStore = codePush(HomeInAStackWithStore)

AppRegistry.registerComponent('Genny', () => HomeInAStackWithStore)
