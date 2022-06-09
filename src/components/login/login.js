import React, { Component } from 'react';
import { StyleSheet, Alert, ImageBackground, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../../api';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            email: '',
            pass: ''
        };
    }

    async componentDidMount() {
        let token = await AsyncStorage.getItem('token');
        if (token !== undefined && token !== null && token !== '') {
            const verifyToken = await API.login.verify(token);
            if (verifyToken._id !== undefined) {
                this.props.navigation.push('Home')
            } else {
                await AsyncStorage.removeItem('token')
            }
        }
    }

    verificarLogueo = async () => {
        
    }

    register = () => {
        this.props.navigation.navigate('Register')
    }

    entrar = async () => {
        try {
            await this.setState({loading: true})
            if (this.state.email && this.state.pass) {
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
                    Alert.alert('Email y/o contraseña son incorrectos');
                }
            } else {
                Alert.alert('Email y contraseña son obligatorios');
            }
            
        } catch (error) {
            await this.setState({loading: false})
            
        } finally {
            await this.setState({loading: false})
        }

    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'stretch',
                }}>
                    <View style={{ marginTop: 50, marginLeft: "10%", marginRight: "10%" }}>
                        <TextInput
                            style={styles.body}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            autocompletetype = "email"
                            onChangeText={(email) => this.setState({ email })}
                            defaultValue={this.state.email}
                            maxLength={40}
                        />
                        <TextInput
                            style={styles.body}
                            placeholder="Contraseña"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            onChangeText={(pass) => this.setState({ pass })}
                            defaultValue={this.state.pass}
                            maxLength={40}
                        />
                    </View>
                    <View style={styles.botones}>
                        <Button color="#FFFFFF" onPress={this.entrar} disabled={this.state.loading} title="Ingresar" />
                    </View>
                    <View style={styles.botones}>
                        <Button color="#FFFFFF" onPress={this.register} disabled={this.state.loading} title="Registrate" />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    botones: {
        marginTop: "2%",
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "#0000FB"
    },
    textCenter: {
        textAlign: 'center',
        width: '100%',
        color: '#000'
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    boton: {
        marginLeft: '30%',
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
    }
})
