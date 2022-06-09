import axios from 'axios'
import global from './global';
const URL = global + 'auth';

export async function login(data) {
	const result = await axios.post(URL, data,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		})
	return result.data
}

export async function verify(token) {
	const result = await axios.post(URL + '/verify',{},
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
	return result.data
}

export default {
	login,
	verify
}
