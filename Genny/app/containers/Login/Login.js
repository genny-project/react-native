import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

class Login extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Login',
        headerStyle: { backgroundColor: 'orange' },
        headerTintColor: 'white'
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
            </View>
        )
    }
}

export default Login
