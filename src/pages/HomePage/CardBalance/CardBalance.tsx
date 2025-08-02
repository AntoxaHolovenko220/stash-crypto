import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import routes from '@/router/routes.json'
import { useState } from 'react'

interface CardBalanceProps {
	balance: number | string
	BTCbalance: number | string
	showBtcBalance?: boolean
}

const CardBalance = ({
	balance,
	BTCbalance,
	showBtcBalance,
}: CardBalanceProps) => {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const [error, setError] = useState('')

	const commonTextStyles = {
		fontFamily: 'Manrope',
		fontWeight: 700,
		lineHeight: 1,
		color: '#FFFFFF',
		textTransform: 'uppercase',
	}

	if (error) {
		return <Typography color='error'>Error: {error}</Typography>
	}

	return (
		<Box
			sx={{
				maxWidth: '420px',
				aspectRatio: '1 / 0.4758',
				backgroundImage: 'url(/balance-card.svg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				p: '20px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderRadius: '20px',
			}}
		>
			<Box>
				<Typography sx={{ ...commonTextStyles, fontSize: '22px' }}>
					{t('your balance')}
				</Typography>

				<Box sx={{ mt: '25px' }}>
					<Typography
						sx={{
							...commonTextStyles,
							fontSize: '26px',
							letterSpacing: '-1px',
						}}
					>
						$ {balance}
					</Typography>
					{showBtcBalance && (
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontWeight: 700,
								lineHeight: 1,
								color: '#FFFFFF',
								textTransform: 'uppercase',
								fontSize: '32px',
								mt: '10px',
								letterSpacing: '-1px',
							}}
						>
							{BTCbalance} BTC
						</Typography>
					)}
				</Box>
			</Box>

			<Typography
				sx={{
					width: 'fit-content',
					fontFamily: 'Manrope',
					fontSize: '20px',
					fontWeight: 300,
					color: '#FFFFFF',
					lineHeight: 1,
					borderBottom: '1px solid #FFFFFF',
					cursor: 'pointer',
					transition: 'opacity 0.2s ease',
					'&:hover': { opacity: 0.8 },
				}}
				role='button'
				onClick={() => navigate(routes.TransactionsPage.path)}
			>
				{t('transaction history')}
			</Typography>
		</Box>
	)
}

export default CardBalance
