import axios from 'axios'
import { getBaseURL } from './utils/config';
import toast from 'react-hot-toast';

const baseURL = getBaseURL()
const axiosInstance  = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: ""
	}
})

axiosInstance.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access-token');
		if (token) {
			config.headers!['Authorization'] = token;
		}
		return config;
	},
	error => {
	  	return Promise.reject(error);
	}
)

axiosInstance.interceptors.response.use(
	res => {
	  return res;
	},
	async err => {
	  const originalConfig = err.config;
  
		if (originalConfig.url !== '/api/auth/sign-in' && err.response) {
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;
				const refreshToken = localStorage.getItem('refresh-token')!
				try {
					const rs = await axios({
						method: "POST",
						url: baseURL + "/api/auth/refresh",
						headers: {
							"Authorization": refreshToken
						}
					});

					const access = rs.data.data['X-Auth-Token'];
					const refresh = rs.data.data['X-Refresh-Token'];
		
					localStorage.setItem('access-token', access);
					localStorage.setItem('refresh-token', refresh);
		
					return axiosInstance(originalConfig);
				} catch (_error) {
					toast.error('Session time out. Please login again.', {
						id: 'sessionTimeOut'
					});
					localStorage.removeItem('access-token');
					localStorage.removeItem('refresh-token');
					window.location.href = window.location.origin + "/auth/sign-in";
					return Promise.reject(_error);
				}
			}
		}
  
	  	return Promise.reject(err);
	}
)

export default axiosInstance;