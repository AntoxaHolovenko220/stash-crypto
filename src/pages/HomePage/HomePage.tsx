import { useState, useEffect } from 'react'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'
import CardBalance from './CardBalance'
import {
	TransactionCard,
	VerificationBlock,
	Loader,
	NoTransactionsBlock,
} from '@/components'
import { getProfile, Client } from '@/api/clientService'
import {
	getProfileTransactions,
	TransactionData,
} from '@/api/transactionService'
import {
	PaymentMethod,
	TransactionStatus,
	TransactionType,
} from '@/components/TransactionCard/TransactionCard'

const HomePage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [profile, setProfile] = useState<Client>()
	const [transactions, setTransactions] = useState<TransactionData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	const isMobile = useMediaQuery('(max-width:480px)')

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfile()
				setProfile(data)
				const transactionData = await getProfileTransactions()
				setTransactions(transactionData)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch profile:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [t])

	const sortedTransactions = [...transactions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5)

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Typography color='error'>{error}</Typography>
	}

	if (!profile) {
		return <Typography>{t('error occurred')}</Typography>
	}

	const gradientText = {
		background: 'linear-gradient(90deg, #0246FF, #666666)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		fontFamily: 'Manrope',
		fontWeight: 700,
		lineHeight: 1,
		textTransform: 'uppercase',
	}

	const actionButton = {
		px: '50px',
		width: '100%',
		height: '56px',
		border: '1px solid #414141',
		borderRadius: '6px',
		boxShadow: 'none',
		background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
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
				{t('home')}
			</Typography>

			<Box
				sx={{
					mt: isMobile ? '35px' : '60px',
					display: 'flex',
					justifyContent: 'space-between',
					'@media (max-width:768px)': {
						flexDirection: 'column',
						alignItems: 'center',
					},
				}}
			>
				<Box sx={{ maxWidth: isMobile ? '420px' : '393px', width: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{isMobile && (
							<Box
								sx={{
									width: '100px',
									height: '80px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: '20px',
									background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
								}}
							>
								<Box
									component='img'
									src='/person-white.svg'
									sx={{ width: '55px', height: 'auto' }}
								/>
							</Box>
						)}
						<Box sx={{ maxWidth: isMobile ? '244px' : '100%' }}>
							<Typography
								sx={{ ...gradientText, fontSize: isMobile ? '22px' : '40px' }}
							>
								{t('nice to see')}
							</Typography>
							<Typography
								sx={{
									...gradientText,
									mt: '15px',
									fontSize: isMobile ? '14px' : '26px',
								}}
							>
								{t('bridge')}
							</Typography>
						</Box>
					</Box>
					<VerificationBlock
						status={profile.verificationStatus}
						sx={{ mt: isMobile ? '10px' : '50px' }}
					/>
					{isMobile && (
						<Typography
							sx={{
								mt: '5px',
								ml: '11px',
								mb: '30px',
								fontFamily: 'Manrope',
								fontSize: '18px',
								lineHeight: 1,
							}}
						>
							{profile.firstName} {profile.lastName}
						</Typography>
					)}
				</Box>

				<Box sx={{ maxWidth: '420px', width: '100%' }}>
					<CardBalance
						balance={Number(profile.balance).toFixed(2)}
						showBtcBalance={profile.showBTCBalance}
						BTCbalance={Number(profile.balanceBTC).toFixed(8)}
					/>
					<Box
						sx={{
							mt: '40px',
							display: 'flex',
							flexDirection: 'column',
							gap: '15px',
						}}
					>
						<Button
							variant='contained'
							sx={actionButton}
							onClick={() => navigate(routes.TopUpPage.path)}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '20px',
										fontWeight: 700,
										textTransform: 'none',
									}}
								>
									{t('top up')}
								</Typography>
								<Box component='img' src='/top-up.svg' />
							</Box>
						</Button>

						<Button
							variant='contained'
							sx={actionButton}
							onClick={() => navigate(routes.WithdrawPage.path)}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '20px',
										fontWeight: 700,
										textTransform: 'none',
									}}
								>
									{t('withdraw')}
								</Typography>
								<Box component='img' src='/withdraw.svg' />
							</Box>
						</Button>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', mt: '60px' }}
			>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '22px',
						fontWeight: 500,
						lineHeight: 1.2,
					}}
				>
					{t('transaction history')}
				</Typography>
				{!isMobile && (
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '20px',
							borderBottom: '1px solid #000000',
							cursor: 'pointer',
							'&:hover': { opacity: 0.7 },
						}}
						onClick={() => navigate(routes.TransactionsPage.path)}
					>
						{t('all transactions')}
					</Typography>
				)}
			</Box>

			<Box
				sx={{
					mt: isMobile ? '30px' : '50px',
					display: 'flex',
					flexDirection: 'column',
					gap: '25px',
				}}
			>
				{transactions.length === 0 && <NoTransactionsBlock />}
				{sortedTransactions.map((transaction, index) => (
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

			{isMobile && transactions.length !== 0 && (
				<Button
					sx={{
						width: '100%',
						height: '56px',
						mt: '30px',
						border: '1px solid #EBEBEB',
						borderRadius: '6px',
						fontFamily: 'Manrope',
						fontSize: '22px',
						fontWeight: 700,
						textTransform: 'none',
						color: '#000000',
					}}
					onClick={() => navigate(routes.TransactionsPage.path)}
				>
					{t('all transactions')}
				</Button>
			)}
		</Box>
	)
}

export default HomePage
