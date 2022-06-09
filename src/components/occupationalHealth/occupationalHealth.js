import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Text, Dimensions, ScrollView } from 'react-native';

export default class OccupationalHealth extends Component {
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
                            <Text style={{ fontSize:20, fontWeight: "bold" }}> Salud Ocupacional </Text>
                        </View>
                        <View style={{ alignSelf:"center", marginTop: 20, padding:10 }}>
                            <Text style={{ fontSize:15 }}>No siempre es fácil conseguir la postura de conducción óptima, ya que depende del tipo de reglajes que incorpore nuestro vehículo,
                            pero sí hay unos ajustes mínimos que siempre debemos tener en cuenta a la hora de afrontar un trayecto en coche.</Text>
                        </View>
                        <View style={{ alignSelf:"center", padding:10 }}>
                            <Text style={{ fontSize:15 }}>A continuación encontrara 5 tips para su postura mientras conduce los cuales son:</Text>
                        </View>
                        <View style={{ marginTop: 20, marginLeft: "5%", marginRight: "5%" }}>
                            <Text style={styles.title}>1. Acomoda el asiento</Text>
                            <Text style={{ fontSize:15 }}>Revisa la distancia de las piernas con los pedales, el asiento debe estar cerca para poder accionar el embrague a fondo,
                            la pierna izquierda debe quedar un poco flexionada, para garantizar mayor soporte en caso de accidente.</Text>
                            <Text style={styles.title}>2. Ubica el espaldar</Text>
                            <Text style={{ fontSize:15 }}>Nunca debes conducir con el respaldo del asiento muy inclinado hacia atrás. Cuanto más inclinado hacia atrás esté el respaldo del asiento,
                            mayor será el riesgo de lesiones.</Text>
                            <Text style={styles.title}>3. Acomodar el apoya cabeza</Text>
                            <Text style={{ fontSize:15 }}>Ajustar el apoya cabezas para que su borde superior se encuentre en la misma línea de la parte superior de la cabeza, aunque no por debajo de la altura de los ojos.</Text>
                            <Text style={styles.title}>4. Posición del volante</Text>
                            <Text style={{ fontSize:15 }}>La distancia correcta entre el conductor y el volante debe ser, como mínimo, de 25 cm. El volante debe apuntar siempre en dirección al tórax y no en dirección al rostro.
                            Asegúralo con ambas manos en una posición 9 horas 15 minutos durante la conducción.</Text>
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
        marginRight: "10%"
    },
    body: {
        paddingVertical: 20
    },
    placeholder: {
        color: '#000'
    },
    title: {
        fontSize: 16,
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
        opacity: 0.1
    },
    scroll: {
        backgroundColor: 'transparent',
    },
})
