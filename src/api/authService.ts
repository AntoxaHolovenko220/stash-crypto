import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export interface AuthResponse {
	accessToken: string
	refreshToken: string
}

export interface RegisterData {
	firstName: string
	lastName: string
	email: string
	phone: string
	country: string
	password: string
	isTermsAccepted: boolean
}

export interface LoginData {
	email: string
	password: string
}

export interface TokenPayload {
	sub: string
	email: string
	roles: string[]
	iat: number
	exp: number
}

export const registerUser = async (
	data: RegisterData
): Promise<AuthResponse> => {
	const response = await axios.post(`${API_URL}/user/auth/register`, data)
	return response.data
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	let status
	if (data.email === 'admin@gmail.com') status = 'admin'
	else status = 'user'
	const response = await axios.post(`${API_URL}/${status}/auth/login`, data)
	return response.data
}

const decodeToken = (token: string): TokenPayload | null => {
	try {
		const base64Url = token.split('.')[1]
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
				.join('')
		)
		return JSON.parse(jsonPayload)
	} catch (e) {
		console.error('Failed to decode token', e)
		return null
	}
}

export const storeTokens = (tokens: AuthResponse) => {
	localStorage.setItem('accessToken', tokens.accessToken)
	localStorage.setItem('refreshToken', tokens.refreshToken)

	const payload = decodeToken(tokens.accessToken)
	if (payload) {
		localStorage.setItem(
			'userData',
			JSON.stringify({
				id: payload.sub,
				email: payload.email,
				roles: payload.roles,
				tokenExp: payload.exp,
			})
		)
	}
}

export const clearTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
	localStorage.removeItem('userData')
}

export const getUserData = (): TokenPayload | null => {
	const userData = localStorage.getItem('userData')
	return userData ? JSON.parse(userData) : null
}

export const isAuthenticated = () => {
	return !!localStorage.getItem('accessToken')
}

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
	while (failedQueue.length) {
		const request = failedQueue.shift()
		if (token) {
			request.resolve(token)
		} else {
			request.reject(error)
		}
	}
}

axios.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		const userData = getUserData()

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			localStorage.getItem('refreshToken')
		) {
			originalRequest._retry = true

			if (isRefreshing) {
				try {
					const token = await new Promise<string>((resolve, reject) => {
						failedQueue.push({ resolve, reject })
					})
					originalRequest.headers['Authorization'] = 'Bearer ' + token
					return axios(originalRequest)
				} catch (err) {
					return Promise.reject(err)
				}
			}

			isRefreshing = true

			try {
				const refreshToken = localStorage.getItem('refreshToken')
				const res = await axios.post(
					`${API_URL}/${userData?.roles[0]}/auth/refresh`,
					{
						refreshToken,
					}
				)

				const newAccessToken = res.data.accessToken
				const newRefreshToken = res.data.refreshToken

				localStorage.setItem('accessToken', newAccessToken)
				localStorage.setItem('refreshToken', newRefreshToken)

				const payload = decodeToken(newAccessToken)
				if (payload) {
					localStorage.setItem(
						'userData',
						JSON.stringify({
							id: payload.sub,
							email: payload.email,
							roles: payload.roles,
							tokenExp: payload.exp,
						})
					)
				}

				axios.defaults.headers.common['Authorization'] =
					'Bearer ' + newAccessToken
				processQueue(null, newAccessToken)

				originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken
				return axios(originalRequest)
			} catch (err) {
				processQueue(err, null)
				clearTokens()
				window.location.href = '/'
				return Promise.reject(err)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)
