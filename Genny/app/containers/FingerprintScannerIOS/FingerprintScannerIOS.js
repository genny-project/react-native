import React, { Component } from 'react'
import { View, Text, AlertIOS } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'

import styles from './styles'

class FingerprintScannerIOS extends React.Component {

    handlePopupDismissed = () => {
        AlertIOS.alert('Dismissed')
    }

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .then(() => {
                FingerprintScanner
                    .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
                    .then(() => {
                        this.props.navigation.navigate('Main')
                        AlertIOS.alert('Authenticated successfully')
                    })
                    .catch((error) => {
                        AlertIOS.alert(error.message)
                    })
            })
            .catch((error) => {
                AlertIOS.alert(error.message)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>iOS Fingerprint Scanner</Text>
            </View>
        )
    }
}

export default FingerprintScannerIOS
