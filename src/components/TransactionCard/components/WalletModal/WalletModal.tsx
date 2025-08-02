import {
	Box,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface WalletValues {
	walletBTCAddress?: string
	paypalAddress?: string
}

interface WalletModalProps {
	open: boolean
	onClose: () => void
	value: WalletValues
	name: string
}

const WalletModal = ({ open, onClose, value, name }: WalletModalProps) => {
	const { t } = useTranslation()

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					boxSizing: 'border-box',
					width: '354px',
					borderRadius: '6px',
					p: '16px',
				},
			}}
		>
			<DialogContent sx={{ p: 0, px: '8px' }}>
				<Box>
					{name == 'paypalAddress' ? (
						<Box component='img' src='/paypal.svg' />
					) : (
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '12px',
								fontWeight: 700,
							}}
						>
							{t('wallet')}
						</Typography>
					)}
					<TextField
						autoFocus
						variant='standard'
						type='text'
						fullWidth
						InputProps={{
							readOnly: true,
							disableUnderline: true,
							sx: {
								fontSize: '13px',
								fontFamily: 'Manrope',
								p: '2px 5px 1px 5px',
								backgroundColor: 'transparent',
								border: '1px solid #0C3E9C66',
								borderRadius: '8px',
							},
						}}
						value={
							name === 'paypalAddress'
								? value.paypalAddress
								: value.walletBTCAddress
						}
					/>
				</Box>
			</DialogContent>
		</Dialog>
	)
}

export default WalletModal
