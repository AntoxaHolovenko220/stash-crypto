import { Typography, TextField, Dialog, DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface WireValues {
	firstName?: string
	lastName?: string
	accountNumber?: string
	routingNumber?: string
	bankName?: string
	address?: string
}

interface WireModalProps {
	open: boolean
	onClose: () => void
	values: WireValues
}

const WireTransferModal = ({ open, onClose, values }: WireModalProps) => {
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
					value={values?.firstName}
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
					value={values?.lastName}
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
					value={values?.accountNumber}
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
					inputProps={{
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
					value={values?.routingNumber}
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
					value={values?.bankName}
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
					value={values?.address}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default WireTransferModal
