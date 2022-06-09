import React, { Component } from 'react';
import { StyleSheet, Alert, View, Text, TextInput, Button, Dimensions } from 'react-native';
import API from '../../api';

export default class ChangePass extends Component {
    constructor() {
        super()
        this.initialState = {
            loading: false,
            passCurrent: '',
            newPass: '',
            passVerify: '',
        };
        this.state = this.initialState
    }

    actualizar = async () => {
        await this.setState({loading: true})
        if (this.state.passCurrent && this.state.newPass && this.state.passVerify) {
            if (this.state.newPass !== this.state.passVerify) {
                Alert.alert('La contraseñas no coinciden');
            } else {
                const data = {
                    passCurrent: this.state.passCurrent,
                    pass: this.state.newPass,
                }
                const result = await API.account.updateUser(data);
                if (result.errors) {
                    if (result.errors.passCurrent) {
                        Alert.alert(result.errors.passCurrent);
                    }
                    if (result.errors.pass) {
                        Alert.alert(result.errors.pass.message);
                    }
                } else {
                    Alert.alert('¡Contraseña actualizada correctamente!')
                    this.props.navigation.navigate('perfil')
                }

            }
        } else {
            Alert.alert('Diligencia todos los campos');
        }
        await this.setState({loading: false})
    }

    render() {
        return (
            <View style={{
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: '#FFF'
            }}>
                <View style={{ alignSelf:"center", marginTop: 50 }}>
                    <Text style={{ fontSize:20, fontWeight: "bold" }}> Actualizar contraseña </Text>
                </View>
                <View style={{ marginTop: 40, marginLeft: "10%", marginRight: "10%" }}>
                    <Text style={styles.title}>Contraseña actual</Text>
                        <TextInput
                            style={styles.body}
                            placeholder = "Contraseña actual"
                            autocompletetype="password"
                            secureTextEntry={true}
                            onChangeText={(passCurrent) => this.setState({ passCurrent })}
                            defaultValue={this.state.passCurrent}
                            maxLength={40}
                        />
                    <Text style={styles.title}>Contraseña nueva</Text>
                        <TextInput
                            style={styles.body}
                            placeholder = "Contraseña nueva"
                            autocompletetype="password"
                            secureTextEntry={true}
                            onChangeText={(newPass) => this.setState({ newPass })}
                            defaultValue={this.state.newPass}
                            maxLength={40}
                        />
                    <Text style={styles.title}>Repite la contraseña nueva</Text>
                        <TextInput
                            style={styles.body}
                            placeholder = "Repite la contraseña nueva"
                            autocompletetype="password"
                            secureTextEntry={true}
                            onChangeText={(passVerify) => this.setState({ passVerify })}
                            defaultValue={this.state.passVerify}
                            maxLength={40}
                        />
                </View>
                <View style={styles.botones}>
                    <Button color="#FFFFFF" onPress={this.actualizar} disabled={this.state.loading} title="Guardar" />
                </View>
                <View style={styles.botones}>
                    <Button color="#FFFFFF" onPress={() => this.props.navigation.navigate('perfil')} disabled={this.state.loading} title="Volver" />
                </View>
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
