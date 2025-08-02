import {
	Typography,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface WireValues {
	firstName: string
	lastName: string
	accountNumber: string
	routingNumber: string
	bankName: string
	address: string
}

interface WireModalProps {
	open: boolean
	onClose: () => void
	onSave: () => void
	values: WireValues
	onChange: (updater: (prev: WireValues) => WireValues) => void
}

const WireTransferModal = ({
	open,
	onClose,
	onSave,
	values,
	onChange,
}: WireModalProps) => {
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
				<Typography
					sx={{
						mb: '5px',
						fontFamily: 'Manrope',
						fontSize: '12px',
						fontWeight: 700,
					}}
				>
					{t('first name')}
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
					value={values.firstName}
					onChange={e =>
						onChange(prev => ({
							...prev,
							firstName: e.target.value,
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
					{t('last name')}
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
					value={values.lastName}
					onChange={e =>
						onChange(prev => ({
							...prev,
							lastName: e.target.value,
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
					{t('account number')}
				</Typography>
				<TextField
					variant='standard'
					type='text'
					fullWidth
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
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
					value={values.accountNumber}
					onChange={e =>
						onChange(prev => ({
							...prev,
							accountNumber: e.target.value.replace(/\D/g, ''),
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
					{t('routing number')}
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
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					value={values.routingNumber}
					onChange={e =>
						onChange(prev => ({
							...prev,
							routingNumber: e.target.value.replace(/\D/g, ''),
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
					{t('bank')}
				</Typography>
				<TextField
					variant='standard'
					type='text'
					fullWidth
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
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
					value={values.bankName}
					onChange={e =>
						onChange(prev => ({
							...prev,
							bankName: e.target.value,
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
					{t('address')}
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
					value={values.address}
					onChange={e =>
						onChange(prev => ({
							...prev,
							address: e.target.value,
						}))
					}
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

export default WireTransferModal
