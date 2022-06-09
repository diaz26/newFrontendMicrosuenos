import React, { Component } from 'react';
import { StyleSheet, Alert, ImageBackground, View, Text, TextInput, Button, Dimensions, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import API from '../../api'

export default class Register extends Component {
    constructor() {
        super()
        this.initialState = {
            type: Camera.Constants.Type.front,
            hasCameraPermission: null,
            loading: false,
            email: '',
            user: '',
            pass: '',
            cellphone: null,
            tomarMedidas: false,
            tomandoMedidas: false,
            medidas: {
                left: 0,
                rigth: 0
            }
        };
        this.state = this.initialState
    }

    async componentDidMount() {
        const { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    handleFacesDetected = ({ faces }) => {
        if (faces.length > 0 && this.state.tomandoMedidas) {

            if (faces[0]['leftEyeOpenProbability'] <= 0.1000 || faces[0]['rightEyeOpenProbability'] < 0.1000) {
                Alert.alert('Favor abrir los ojos en su estado normal');
                Vibration.vibrate(1000, true);
                this.setState({ tomandoMedidas: false })
            } else {
                Vibration.vibrate(1000, true);
                this.setState({ tomandoMedidas: false, tomarMedidas: false, medidas: {
                    rigth: parseFloat((faces[0]['rightEyeOpenProbability'] * 100).toString()).toFixed(5),
                    left: parseFloat((faces[0]['leftEyeOpenProbability'] * 100).toString()).toFixed(5)
                } })
            }

        }
    };

    updateState(key, value) {
        this.setState({
            [key]: value
        })
    }

    registrar = async () => {
        try {
            await this.setState({ loading: true })
            if (this.state.user && this.state.pass && this.state.email && this.state.cellphone) {
                if (this.state.medidas.rigth > 0 && this.state.medidas.left > 0) {
                    const data = {
                        email: this.state.email,
                        userName: this.state.user,
                        cellphone: this.state.cellphone,
                        pass: this.state.pass,
                        eyeRigth: (this.state.medidas.rigth).toString(),
                        eyeLeft: (this.state.medidas.left).toString(),
                        typeUser: 'Cliente'
                    }
                    const result = await API.register.register(data);
                    if (result.errors) {
                        if (result.errors.cellphone) {
                            Alert.alert(result.errors.cellphone.message);
                        }
                        if (result.errors.email) {
                            Alert.alert(result.errors.email.message);
                        }
                        if (result.errors.pass) {
                            Alert.alert(result.errors.pass.message);
                        }
                        if (result.errors.user) {
                            Alert.alert(result.errors.user.message);
                        }
                    } else if (result._id) {
                        const data = {
                            email: this.state.email,
                            pass: this.state.pass
                        }
                        const result = await API.login.login(data)
                        if (result.token) {
                            await AsyncStorage.setItem('_id', result.user)
                            await AsyncStorage.setItem('token', result.token)
                            await AsyncStorage.setItem('eyeLeft', result.eyeLeft)
                            await AsyncStorage.setItem('eyeRigth', result.eyeRigth)
                            await AsyncStorage.setItem('userName', result.userName)
                            this.props.navigation.push('Home')
                        } else {
                            Alert.alert('Error en el proceso');
                        }
                    }
                } else if (!this.state.tomarMedidas) {
                    await this.setState({ tomarMedidas: true })
                } else {
                    Alert.alert('Favor tomar las medidas de la apertura ocular');
                }
            } else {
                Alert.alert('Diligencie todos los campos');
            }
            
        } catch (error) {
            console.log(error)
            await this.setState({ loading: false })
        } finally {
            await this.setState({ loading: false })
        }
    }

    login = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        const { tomarMedidas } = this.state;
        if (tomarMedidas) {
            const { hasCameraPermission } = this.state;
            if (hasCameraPermission === null) {
                return <View />;
            } else if (hasCameraPermission === false) {
                return <Text>La aplicación no tiene acceso a la cámara</Text>;
            } else {
                return <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 2 }} type={this.state.type} ref={(ref) => { this.camera = ref }}
                        onFacesDetected={this.handleFacesDetected}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.accurate,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all,
                            minDetectionInterval: 2000,
                            tracking: true,
                        }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'column-reverse',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.15,
                                    alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    this.setState({
                                        type:
                                            this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Cambiar </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-start',
                                    alignItems: 'center'
                                }}
                                onPress={() => { this.setState({ tomandoMedidas: true }) }}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capturar medidas </Text>
                            </TouchableOpacity>

                        </View>

                    </Camera>
                </View>
            }
        } else {
            return (
                <View style={styles.vista}>
                    <ImageBackground source={require('../../../assets/background.png')} style={styles.imagen} />
                    <ScrollView style={styles.scroll}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignSelf: 'stretch',
                        }}>
                            <View style={{ alignSelf: "center", marginTop: 50 }}>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}> Regístrate </Text>
                            </View>
                            <View style={{ marginTop: 40, marginLeft: "10%", marginRight: "10%" }}>
                                <Text style={styles.title}>Email</Text>
                                <TextInput
                                    style={styles.body}
                                    placeholder="Email"
                                    autocompletetype="email"
                                    onChangeText={(email) => this.setState({ email })}
                                    defaultValue={this.state.email}
                                    maxLength={40}
                                />
                                <Text style={styles.title}>Celular</Text>
                                <TextInput
                                    style={styles.body}
                                    placeholder="Celular"
                                    autocompletetype="tel"
                                    keyboardType="numeric"
                                    onChangeText={(cellphone) => this.setState({ cellphone })}
                                    defaultValue={this.state.cellphone}
                                    maxLength={10}
                                />
                                <Text style={styles.title}>Usuario</Text>
                                <TextInput
                                    style={styles.body}
                                    placeholder="Usuario"
                                    autocompletetype="name"
                                    onChangeText={(user) => this.setState({ user })}
                                    defaultValue={this.state.user}
                                    maxLength={40}
                                />
                                <Text style={styles.title}>Contraseña</Text>
                                <TextInput
                                    style={styles.body}
                                    placeholder="Contraseña"
                                    autocompletetype="password"
                                    secureTextEntry={true}
                                    onChangeText={(pass) => this.setState({ pass })}
                                    defaultValue={this.state.pass}
                                    maxLength={40}
                                />
                            </View>
                            <View style={{ marginTop: 10, marginBottom: 10,  alignSelf: 'center' }}>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}> Medidas capturadas de apertura ocular </Text>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}> Ojo derecho: {this.state.medidas.rigth} % </Text>
                                <Text style={{ fontSize: 17, fontWeight: "bold" }}> Ojo izquierdo: {this.state.medidas.left} % </Text>
                            </View>
                            <View style={styles.botones}>
                                <Button color="#FFFFFF" onPress={this.registrar} disabled={this.state.loading} title="Registrarme" />
                            </View>
                            <View style={styles.botones}>
                                <Button color="#FFFFFF" onPress={this.login} disabled={this.state.loading} title="Tengo un usuario" />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    botones: {
        marginTop: "2%",
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "#0000FB"
    },
    body: {
        paddingVertical: 10,
        fontSize: 15,
        marginBottom: 12,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    placeholder: {
        color: '#000'
    },
    title: {
        fontWeight: "bold",
        fontSize: 15
    },
    vista: {
        backgroundColor: '#FFF',
        flex: 1,
        position: 'relative'
    },
    imagen: {
        justifyContent: "center",
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        opacity: 0.3
    },
    scroll: {
        backgroundColor: 'transparent',
    },
})
