import React, { Component } from 'react';
import { StyleSheet, Alert, ImageBackground, View, Text, TextInput, Button, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../api';

export default class Profile extends Component {
    constructor() {
        super()
        this.initialState = {
            loading: false,
            email: '',
            user: '',
            cellphone: null,
        };
        this.state = this.initialState
    }

    async getUser() {
        const userResult = await API.account.detail()
        if (userResult._id !== undefined) {
            this.setState({
                email: userResult.email,
                user: userResult.userName,
                cellphone: userResult.cellphone
            })
        }
    }

    async componentDidMount() {
        await this.getUser();
    }

    updateState(key, value) {
        this.setState({
            [key]: value
        })
    }

    guardar = async () => {
        await this.setState({loading: true})
        if (this.state.user && this.state.email && this.state.cellphone) {
            const data = {
                email: this.state.email,
                userName: this.state.user,
                cellphone: this.state.cellphone,
            }
            const result = await API.account.updateUser(data);
            if (result.errors) {
                if (result.errors.cellphone) {
                    Alert.alert(result.errors.cellphone.message);
                }
                if (result.errors.email) {
                    Alert.alert(result.errors.email.message);
                }
                if (result.errors.user) {
                    Alert.alert(result.errors.user.message);
                }
            } else {
                AsyncStorage.setItem('userName', data.userName)
                Alert.alert('¡Información actualizada correctamente!');
            }
        } else {
            Alert.alert('Diligencia todos los campos');
        }
        await this.setState({loading: false})
    }

    render() {
        return (
            <View style={styles.vista}>
                <ImageBackground source={require('../../../assets/background.png')} style={ styles.imagen } />
                <ScrollView style={ styles.scroll }>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                    }}>
                        <View style={{ alignSelf:"center", marginTop: 50 }}>
                            <Text style={{ fontSize:20, fontWeight: "bold" }}> Información </Text>
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
                        </View>
                        <View style={styles.botones}>
                            <Button color="#FFFFFF" onPress={this.guardar} disabled={this.state.loading} title="Guardar" />
                        </View>
                        <View style={styles.botones}>
                            <Button color="#FFFFFF" onPress={() => this.props.navigation.navigate('changePass') } disabled={this.state.loading} title="Cambiar contraseña" />
                        </View>

                    </View>
                </ScrollView>
            </View>
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
        fontWeight: "bold"
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
        opacity: 0.2
    },
    scroll: {
        backgroundColor: 'transparent',
    },
})
