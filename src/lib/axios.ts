import axios from 'axios';
// import createAuthRefreshInterceptor from 'axios-auth-refresh';
// import { cookies } from 'next/headers'

const axiosInstance  = axios.create({
	baseURL: 'http://localhost:3000', // Replace with your API endpoint
	timeout: 5000, // Set a timeout for requests (in milliseconds)
	headers: {
		'Content-Type': 'application/json', // Set the default content type for request headers
		Authorization: 'Bearer ', // Set authorization headers if needed
	},
});

export const setHeaders = (name: string, value: any): void => {
	axiosInstance.defaults.headers[name] = value;
}

// const getAccessToken = () => {
// 	const accessToken = cookies().get("access_token");
// 	return accessToken? accessToken.value: null;
// }

// const getRefreshToken = () => {
// 	const refreshToken = cookies().get("refresh_token");
// 	return refreshToken? refreshToken.value: null;
// }

// const refreshAuthLogic = (failedRequest: any) =>
//     axiosInstance({
// 		method: 'get',
// 		url: 'api/auth/refresh',
// 		headers: {
//             'Content-Type': 'application/json',
//         },
// 		data: {
// 			refresh_token: getRefreshToken()
// 		}
// 	}).then((tokenRefreshResponse) => {
// 		cookies().set("access_token", tokenRefreshResponse.data.access_token);
// 		cookies().set("refresh_token", tokenRefreshResponse.data.refresh_token);
//         failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access_token;
//         return Promise.resolve();
//     });

// createAuthRefreshInterceptor(
//     axiosInstance,
//     refreshAuthLogic
// );

export default axiosInstance;