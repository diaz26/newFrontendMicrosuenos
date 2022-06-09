import React from 'react';
import { View, Vibration, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import API from '../../api';

export default class Action extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        };
    }

    async componentDidMount() {
        Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: true,
        })

        this.sound = new Audio.Sound();
        await this.sound.loadAsync(require('../../../music/ring.mp3'), { shouldPlay: false }, false)
        this.sound.setVolumeAsync(1.0)

        Vibration.vibrate(3000, true);
        this.sound.playAsync();
        Alert.alert(
            'Alerta de Microsueño',
            'Esta alarma ha sido generada por manifestar un microsueño. ¡Por favor duerma!',
            [
                {
                    text: 'OK', onPress: () => {
                        Vibration.cancel()
                        this.sound.stopAsync()
                        this.props.navigation.navigate('Camara')
                    }
                },
            ],
            { cancelable: false }
        );
        const userId = await AsyncStorage.getItem('_id')
        await API.account.createStatis({
            user: userId
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

            </View>
        );
    }
}