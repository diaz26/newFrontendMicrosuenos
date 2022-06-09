import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../../api';

export default class Home extends Component {
	constructor(props) {
		super(props)
		this.initialState = {
			token: null,
			_id: null,
			userName: null,
			estadisticas: null,
			ramdom: null
		};
		this.state = this.initialState
	}

	updateState(key, value) {
		this.setState({
			[key]: value
		})
	}

	async getUser() {
		this.updateState('token', await AsyncStorage.getItem('token'))
		this.updateState('_id', await AsyncStorage.getItem('_id'))
		this.updateState('userName', await AsyncStorage.getItem('userName'))
		const resultStatistics = await API.account.detailStatistics(await AsyncStorage.getItem('_id'))
		this.updateState('estadisticas', resultStatistics)
	}

	async componentDidMount() {
		await this.getUser();
	}

	render() {
		return (
			<View style={styles.vista}>
				<ImageBackground source={require('../../../assets/background.png')} style={styles.imagen} />
				<View style={{ marginTop: 8, flex:1 }}>
					<View style={{ justifyContent:"center", alignSelf:"center", marginTop:40 }}>
						<Text style={styles.title}> Microsueños </Text>
					</View>
				</View>
				<View style={{ marginTop: 8,  flex:1 }}>
					<View style={{ justifyContent:"center", alignItems:"center", marginLeft:'10%', marginRight:'10%' }}>
						< Text style={styles.body} >
							Bienvenido {this.state.userName}
							{'\n'}
							{'\n'}
							Hasta el dia de hoy usted ha presentado {this.state.estadisticas} microsueños
							{'\n'}
							{'\n'}
							¡Recuerde dormir bien!
						</Text> 
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	vista: {
		flex: 1,
		position: 'relative',
		backgroundColor: '#FFF',
	},
	body: {
		fontSize: 16
	},
	title: {
		fontWeight: "bold",
		fontSize: 20
	},
	imagen: {
		justifyContent: "center",
		position: "absolute",
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		opacity: 0.5
	},
})
