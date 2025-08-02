import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export interface TransactionData {
	id?: string
	type: string
	amount: string
	balance?: string
	method: string
	date: string
	status: string
	transactionId: string
	note?: string
	paymentDetails?: object
}

export const createAdminTransaction = async (
	clientId: string,
	data: TransactionData
) => {
	const response = await axios.post(
		`${API_URL}/transactions/admin/${clientId}`,
		{
			...data,
			currency: 'USD',
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const editTransaction = async (id: string, data: TransactionData) => {
	const response = await axios.patch(
		`${API_URL}/transactions/${id}`,
		{
			...data,
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const createUserTransaction = async (data: TransactionData) => {
	const response = await axios.post(
		`${API_URL}/transactions`,
		{
			...data,
			currency: 'USD',
		},
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const getUserTransactionsAdmin = async (clientId: string) => {
	const response = await axios.get(
		`${API_URL}/transactions?userId=${clientId}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				'Content-Type': 'application/json',
			},
		}
	)
	return response.data
}

export const getTransactionAdmin = async (id: string) => {
	const response = await axios.get(`${API_URL}/transactions/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
	})
	return response.data
}

export const getTransactionsAdmin = async () => {
	const response = await axios.get(`${API_URL}/transactions`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
	})
	return response.data
}

export const getProfileTransactions = async () => {
	const response = await axios.get(`${API_URL}/transactions/my`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
	})
	return response.data
}
