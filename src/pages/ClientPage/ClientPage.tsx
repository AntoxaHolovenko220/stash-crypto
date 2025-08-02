import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Loader, NoTransactionsBlock, TransactionCard } from '@/components'
import { Client, getClient } from '@/api/clientService'
import { ClientEditForm, CreateTransactionForm } from './components'
import {
	getUserTransactionsAdmin,
	TransactionData,
} from '@/api/transactionService'
import {
	PaymentMethod,
	TransactionStatus,
	TransactionType,
} from '@/components/TransactionCard/TransactionCard'

const ClientPage = () => {
	const { t } = useTranslation()
	const { id } = useParams<{ id: string }>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const [client, setClient] = useState<Client>()
	const [transactions, setTransactions] = useState<TransactionData[]>([])

	useEffect(() => {
		const fetchClient = async () => {
			try {
				if (!id) {
					setError(t('Client ID not provided'))
					return
				}
				const data = await getClient(id)
				setClient(data)
				const transactionData = await getUserTransactionsAdmin(id)
				setTransactions(transactionData)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch client:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchClient()
	}, [id, t])

	console.log(transactions)

	if (loading) return <Loader />
	if (error || !client) return <Typography color='error'>{error}</Typography>

	return (
		<Box>
			<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>
					{t('admin menu')} | {t('clients')}
				</span>{' '}
				| {id}
			</Typography>

			<Box sx={{ mt: '30px', display: 'flex', justifyContent: 'space-around' }}>
				<ClientEditForm
					client={client}
					loading={loading}
					error={error}
					id={id}
					setClient={setClient}
				/>
				<CreateTransactionForm
					clientId={id!}
					onTransactionCreated={newTransaction => {
						setTransactions(prev => [newTransaction, ...prev])
					}}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '25px',
					mt: '30px',
				}}
			>
				{transactions.length === 0 && <NoTransactionsBlock />}
				{transactions.map((transaction, index) => (
					<TransactionCard
						showEdit={true}
						key={index}
						id={transaction.id!}
						transactionId={transaction.transactionId}
						date={transaction.date}
						status={transaction.status as TransactionStatus}
						type={transaction.type as TransactionType}
						paymentMethod={transaction.method as PaymentMethod}
						amount={transaction.amount}
						balance={transaction.balance!}
						paymentDetails={transaction.paymentDetails!}
						setTransactions={setTransactions}
					/>
				))}
			</Box>
		</Box>
	)
}

export default ClientPage
