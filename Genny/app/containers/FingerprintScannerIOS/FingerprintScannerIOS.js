import React, { Component } from 'react'
import { AlertIOS } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'

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
        return false
    }
}

export default FingerprintScannerIOS
