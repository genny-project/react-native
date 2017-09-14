import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, View } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Main from './containers/Main'
import Login from './containers/Login'
import store from './store/configureStore'

const Stack = StackNavigator({
  Login: { screen: Login },
  Main: { screen: Main }
})

const HomeInAStackWithStore = () => (
  <Provider store={store}>
    <Stack />
  </Provider>
)

AppRegistry.registerComponent('Genny', () => HomeInAStackWithStore)
