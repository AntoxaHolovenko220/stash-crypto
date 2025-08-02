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

interface ZelleValues {
	name: string
	email: string
	phone: string
}

interface ZelleModalProps {
	open: boolean
	onClose: () => void
	onSave: () => void
	values: ZelleValues
	onChange: (updater: (prev: ZelleValues) => ZelleValues) => void
}

const ZelleModal = ({
	open,
	onClose,
	onSave,
	values,
	onChange,
}: ZelleModalProps) => {
	const { t } = useTranslation()

	const handleModalPhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		onChange(prev => ({
			...prev,
			phone: digits.length === 0 ? '' : `+${digits}`,
		}))
	}

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
				<Typography
					sx={{
						mb: '5px',
						fontFamily: 'Manrope',
						fontSize: '12px',
						fontWeight: 700,
					}}
				>
					{t('name')}
				</Typography>
				<TextField
					autoFocus
					variant='standard'
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
					value={values.name}
					onChange={e =>
						onChange(prev => ({
							...prev,
							name: e.target.value,
						}))
					}
					sx={{ mb: 2 }}
				/>
				<Typography
					sx={{
						mb: '5px',
						fontFamily: 'Manrope',
						fontSize: '12px',
						fontWeight: 700,
					}}
				>
					{t('email')}
				</Typography>
				<TextField
					variant='standard'
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
					type='email'
					value={values.email}
					onChange={e =>
						onChange(prev => ({
							...prev,
							email: e.target.value,
						}))
					}
					sx={{ mb: 2 }}
				/>
				<Typography
					sx={{
						mb: '5px',
						fontFamily: 'Manrope',
						fontSize: '12px',
						fontWeight: 700,
					}}
				>
					{t('number')}
				</Typography>
				<TextField
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
					value={values.phone}
					onChange={e => handleModalPhoneChange(e.target.value)}
				/>
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

export default ZelleModal
