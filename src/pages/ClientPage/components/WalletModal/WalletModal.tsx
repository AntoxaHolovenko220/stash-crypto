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

interface WalletModalProps {
	open: boolean
	onClose: () => void
	onSave: () => void
	value: string
	onChange: (value: string) => void
	name: string
}

const WalletModal = ({
	open,
	onClose,
	onSave,
	value,
	onChange,
	name,
}: WalletModalProps) => {
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
					{name == 'paypal' ? (
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
						value={value}
						onChange={e => onChange(e.target.value)}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={onSave}
					sx={{
						width: '100%',
						height: '56px',
						border: '1px solid #232323',
						borderRadius: '6px',
						background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
						fontFamily: 'Manrope',
						fontSize: '22px',
						fontWeight: 700,
						textTransform: 'none',
						color: '#FFF',
					}}
				>
					{t('save')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default WalletModal
