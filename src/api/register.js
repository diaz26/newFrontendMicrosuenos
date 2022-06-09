import axios from 'axios'
import global from './global';
const URL = global + 'user'

export async function register(data) {
	const result = await axios.post(URL, data,
		{
			headers: {
				'Content-Type': 'application/json'
			}
		})
	return result.data
}

export default {
	register
}
