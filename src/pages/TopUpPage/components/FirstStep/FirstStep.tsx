import {
	Box,
	Typography,
	Radio,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Client } from '@/api/clientService'

type Method =
	| 'paypalAddress'
	| 'zelleTransfer'
	| 'wireTransfer'
	| 'walletBTCAddress'

interface Props {
	selectedOption: Method
	setSelectedOption: Dispatch<SetStateAction<Method>>
	setCheckForm: Dispatch<SetStateAction<boolean>>
	profile: Client
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
		id: 'zelleTransfer',
		icon: '/bigzelle.svg',
		name: 'Zelle',
		time: 'instantly',
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
	profile,
}: Props) => {
	const { t } = useTranslation()

	const [showSupportDialog, setShowSupportDialog] = useState(false)

	const handleNext = () => {
		let isValid = true

		switch (selectedOption) {
			case 'paypalAddress':
				isValid = Boolean(profile.paypalAddress)
				break
			case 'zelleTransfer':
				isValid = Boolean(
					profile.zelleTransfer?.recipientName ||
						profile.zelleTransfer?.email ||
						profile.zelleTransfer?.phone
				)
				break
			case 'wireTransfer':
				isValid = Boolean(
					profile.wireTransfer?.firstName ||
						profile.wireTransfer?.lastName ||
						profile.wireTransfer?.accountNumber ||
						profile.wireTransfer?.routingNumber ||
						profile.wireTransfer?.bankName
				)
				break
			case 'walletBTCAddress':
				isValid = Boolean(profile.walletBTCAddress)
				break
			default:
				isValid = true
		}

		if (!isValid) {
			setShowSupportDialog(true)
		} else {
			setCheckForm(true)
		}
	}

	const handleOpenSupport = () => {
		setShowSupportDialog(false)
		window.dispatchEvent(new Event('openSupportModal'))
	}

	return (
		<Box>
			<Typography sx={{ ml: '2px', ...commonTextStyles, fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>{t('home')}</span> | {t('top up')}
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
				{t('choose the method of')}
			</Typography>

			<Typography
				sx={{
					mt: '10px',
					...commonTextStyles,
					fontSize: '16px',
					fontWeight: 400,
				}}
			>
				{t('indicate a convenient option')}
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
					onClick={handleNext}
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
							{t('top up')}
						</Typography>
						<Box component='img' src='/top-up.svg' />
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
			<Dialog
				open={showSupportDialog}
				onClose={() => setShowSupportDialog(false)}
				PaperProps={{
					sx: {
						boxSizing: 'border-box',
						width: '390px',
						minHeight: '263px',
						borderRadius: '24px',
						background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
						color: '#FFFFFF', // чтобы текст был читаемым
						padding: '20px 16px',
					},
				}}
			>
				<DialogContent
					sx={{
						p: '8px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<CloseRoundedIcon
						sx={{
							width: '45px',
							height: '45px',
							borderRadius: '10px',
							background: 'linear-gradient(-45deg, #EF3030 0%, #980202 80%)',
						}}
					/>
					<Typography
						sx={{
							mt: '15px',
							fontFamily: 'Manrope',
							fontSize: '18px',
							fontWeight: 600,
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					>
						{t('some troubles')} {t('supportService')}
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '18px',
							fontWeight: 400,
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					></Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleOpenSupport}
						sx={{
							width: '100%',
							height: '56px',
							border: '1px solid #232323',
							borderRadius: '6px',
							backgroundColor: '#FFFFFF',
							display: 'inline-block',
						}}
					>
						<Typography
							sx={{
								background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontFamily: 'Manrope',
								fontSize: '20px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('write to support service')}
						</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default FirstStep
