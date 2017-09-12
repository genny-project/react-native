import React, { Component } from 'react'
import {
    Alert,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner'

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
                    .authenticate({ onAttempt: this.handleAuthenticationAttempted })
                    .then(() => {
                        Alert.alert('Fingerprint Authentication', 'Authenticated successfully')
                    })
                    .catch((error) => {
                        this.setState({ errorMessage: error.message })
                        Alert.alert(error.message)
                    })
            })
            .catch(error => {
                this.setState({ errorMessage: error.message })
                Alert.alert(error.message)
            })
    }

    componentWillUnmount() {
        FingerprintScanner.release()
    }

    handleAuthenticationAttempted = (error) => {
        this.setState({ errorMessage: error.message })
    }

    render() {
        const { errorMessage } = this.state

        return (
            <View>
                <Text>
                    {errorMessage || 'Scan your fingerprint on the device scanner to continue'}
                </Text>
            </View>
        )
    }
}


export default FingerprintScannerAndroid
