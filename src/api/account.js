import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from './global';
const URL = global + 'user'
const URLStatistics = global + 'statistics/'

export async function detail() {
	const result = await axios.get(`${URL}/detail/${await AsyncStorage.getItem('_id')}`,
		{
			headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
			}
		})
	return result.data
}

export async function createStatis(params) {
	const result = await axios.post(URLStatistics, params,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		})
	return result.data
}

export async function detailStatistics(user) {
	const result = await axios.get(`${URLStatistics}/list/all/${user}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
			}
		}).catch(error => {
			console.log('error', error)
		})
	return result.data
}

export async function updateUser(params) {
	const result = await axios.post(`${URL}/update/${await AsyncStorage.getItem('_id')}`, params, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
		}
	})
	return result.data
}

export default {
	detail,
	createStatis,
	detailStatistics,
	updateUser
}
