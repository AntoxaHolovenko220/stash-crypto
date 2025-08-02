import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Loader, NoTransactionsBlock, TransactionCard } from '@/components'
import { useEffect, useState } from 'react'
import {
	getProfileTransactions,
	TransactionData,
} from '@/api/transactionService'
import {
	PaymentMethod,
	TransactionStatus,
	TransactionType,
} from '@/components/TransactionCard/TransactionCard'

const TransactionsPage = () => {
	const { t } = useTranslation()
	const [transactions, setTransactions] = useState<TransactionData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const transactionData = await getProfileTransactions()
				setTransactions(transactionData)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch transactions:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchTransactions()
	}, [t])

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Typography color='error'>{error}</Typography>
	}

	if (!transactions) {
		return <Typography>{t('error occurred')}</Typography>
	}

	return (
		<Box sx={{ position: 'relative' }}>
			<Typography
				sx={{
					ml: '2px',
					fontFamily: 'Manrope',
					fontSize: '14px',
				}}
			>
				<span style={{ opacity: 0.5 }}>{t('home')}</span> |{' '}
				{t('transaction history')}
			</Typography>
			<Typography
				sx={{
					mt: '60px',
					fontFamily: 'Manrope',
					fontSize: '22px',
					fontWeight: 700,
					lineHeight: 1,
					textTransform: 'uppercase',
				}}
			>
				{t('transaction history')}
			</Typography>
			<Box
				sx={{
					mt: '30px',
					display: 'flex',
					flexDirection: 'column',
					gap: '25px',
				}}
			>
				{transactions.length === 0 && <NoTransactionsBlock />}
				{transactions.map((transaction, index) => (
					<TransactionCard
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
					/>
				))}
			</Box>
		</Box>
	)
}

export default TransactionsPage
