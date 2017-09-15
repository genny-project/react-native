import React, { Component } from 'react'
import { Alert, Text, View } from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'

import styles from './styles'

class FingerprintScannerAndroid extends Component {

    constructor(props) {
        super(props);
        this.state = { errorMessage: undefined }
    }

    componentDidMount() {
        FingerprintScanner
            .isSensorAvailable()
            .then(() => {
                FingerprintScanner
                    .authenticate({ onAttempt: () => {} })
                    .then(() => {
                        this.props.navigation.navigate('Main')
                        Alert.alert('Fingerprint Authentication', 'Authenticated successfully')
                    })
                    .catch((error) => {
                        Alert.alert(error.message)
                    })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    componentWillUnmount() {
        FingerprintScanner.release()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Android Fingerprint Scanner</Text>
            </View>
        )
    }
}

export default FingerprintScannerAndroid
