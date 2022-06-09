import React, { Component } from 'react';
import { View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        AsyncStorage.multiRemove(['_id', 'token', 'eyeLeft', 'eyeRigth', 'userName', 'estadisticas'])
        this.props.navigation.push('Login')
    }

    render() {
        
        return (
            <View></View> 
        );
    }
}
