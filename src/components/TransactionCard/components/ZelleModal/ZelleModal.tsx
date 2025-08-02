import { Typography, TextField, Dialog, DialogContent } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface ZelleValues {
	recipientName?: string
	email?: string
	phone?: string
}

interface ZelleModalProps {
	open: boolean
	onClose: () => void
	values: ZelleValues
}

const ZelleModal = ({ open, onClose, values }: ZelleModalProps) => {
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
					{t('name')}
				</Typography>
				<TextField
					autoFocus
					variant='standard'
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
					value={values?.recipientName}
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
					type='email'
					value={values?.email}
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
					value={values?.phone}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default ZelleModal
