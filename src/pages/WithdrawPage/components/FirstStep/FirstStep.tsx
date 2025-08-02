import { Box, Typography, Radio, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

type Method = 'paypalAddress' | 'wireTransfer' | 'walletBTCAddress'

interface Props {
	selectedOption: Method
	setSelectedOption: Dispatch<SetStateAction<Method>>
	setCheckForm: Dispatch<SetStateAction<boolean>>
}

const commonTextStyles = {
	fontFamily: 'Manrope',
	lineHeight: 1,
}

const paymentMethods = [
	{
		id: 'paypalAddress',
		icon: '/bigpaypal.svg',
		name: 'PayPal',
		time: 'from 1 to 3 hours',
		showName: false,
	},
	{
		id: 'wireTransfer',
		icon: '/bigwire-transfer.svg',
		name: 'Wire transfer',
		time: 'from 1 to 3 business ideas',
		showName: true,
	},
	{
		id: 'walletBTCAddress',
		icon: '/bigwallet.svg',
		name: 'Crypto',
		time: 'instantly',
		showName: true,
	},
]

const FirstStep = ({
	selectedOption,
	setSelectedOption,
	setCheckForm,
}: Props) => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography sx={{ ml: '2px', ...commonTextStyles, fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>{t('home')}</span> | {t('withdraw')}
			</Typography>

			<Typography
				sx={{
					mt: '60px',
					...commonTextStyles,
					fontSize: '22px',
					fontWeight: 700,
					textTransform: 'uppercase',
				}}
			>
				{t('step 1 for 2')}
			</Typography>

			<Typography
				sx={{
					mt: '10px',
					...commonTextStyles,
					fontSize: '16px',
					fontWeight: 400,
				}}
			>
				{t('confirm withdrawal')}
			</Typography>

			<Box
				sx={{
					maxWidth: '500px',
					width: '100%',
					m: '30px auto',
					p: '20px',
					backgroundColor: '#F8F8F8',
					borderRadius: '28px',
					boxSizing: 'border-box',
				}}
			>
				{paymentMethods.map(method => (
					<Box
						key={method.id}
						sx={{ display: 'flex', alignItems: 'flex-start', mt: '25px' }}
					>
						<Radio
							checked={selectedOption === method.id}
							onChange={() => setSelectedOption(method.id as Method)}
						/>
						<Box>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<Box component='img' src={method.icon} />
								{method.showName && (
									<Typography
										sx={{
											...commonTextStyles,
											fontSize: '22px',
											fontWeight: 700,
										}}
									>
										{method.name}
									</Typography>
								)}
							</Box>
							<Typography
								sx={{
									mt: '5px',
									...commonTextStyles,
									fontSize: '14px',
									fontWeight: 400,
									color: '#6A6A6A',
								}}
							>
								{t(method.time)}
							</Typography>
						</Box>
					</Box>
				))}

				<Button
					variant='contained'
					sx={{
						mt: '35px',
						px: '50px',
						width: '100%',
						height: '56px',
						border: '1px solid #414141',
						borderRadius: '6px',
						boxShadow: 'none',
						background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
					}}
					onClick={() => setCheckForm(true)}
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
								...commonTextStyles,
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
				<Box
					sx={{
						mt: '25px',
						display: 'flex',
						gap: '10px',
						alignItems: 'center',
					}}
				>
					<InfoOutlinedIcon />
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '14px',
							color: '#414141',
							opacity: 0.5,
						}}
					>
						{t('all transactions saved')}
					</Typography>
				</Box>
			</Box>
		</Box>
	)
}

export default FirstStep
