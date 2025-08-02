import {
	editTransaction,
	getTransactionAdmin,
	TransactionData,
} from '@/api/transactionService'
import {
	Box,
	Typography,
	TextField,
	Button,
	Dialog,
	DialogContent,
	DialogActions,
	Select,
	MenuItem,
} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ModalProps {
	open: boolean
	onClose: () => void
	setClose: Dispatch<SetStateAction<boolean>>
	setTransactions?: Dispatch<SetStateAction<TransactionData[]>>
	id: string
}

type Option = {
	label?: string
	labelImage?: string
	value: string
	color?: string
	image?: string
}

type InputField = {
	name: string
	key: string
	value: any
	type: string
	inputType?: 'select'
	options?: Option[]
}

const EditTransactionModal = ({
	open,
	onClose,
	setClose,
	setTransactions,
	id,
}: ModalProps) => {
	const { t } = useTranslation()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [transactionData, setTransactionData] = useState({
		transactionId: '',
		currency: 'USD',
		date: '',
		status: '',
		type: '',
		method: '',
		amount: '',
		balance: '',
	})

	const formatDateForInput = (isoDate: string) => {
		const date = new Date(isoDate)
		const offset = date.getTimezoneOffset()
		const localDate = new Date(date.getTime() - offset * 60 * 1000)
		return localDate.toISOString().slice(0, 16)
	}

	useEffect(() => {
		const fetchTransaction = async () => {
			try {
				if (!id) {
					setError(t('Client ID not provided'))
					return
				}
				const data = await getTransactionAdmin(id)
				setTransactionData({
					transactionId: data.transactionId,
					date: formatDateForInput(data.date),
					currency: 'USD',
					status: data.status,
					type: data.type,
					method: data.method,
					amount: data.amount,
					balance: data.balance,
				})
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch transaction:', err)
			}
		}

		fetchTransaction()
	}, [id, t])

	const handleEditTransaction = async () => {
		try {
			const result = await editTransaction(id, transactionData)

			const updated = await getTransactionAdmin(id)
			if (setTransactions) {
				setTransactions(prev => prev.map(t => (t.id === id ? updated : t)))
			}

			console.log(result)
			setClose(false)
		} catch (err) {
			console.error(err)
			console.log('Failed to create transaction')
		}
	}

	const inputs: InputField[] = [
		{
			name: t('id transaction'),
			key: 'transactionId',
			value: transactionData.transactionId,
			type: 'string',
		},
		{
			name: t('date'),
			key: 'date',
			value: transactionData.date,
			type: 'string',
		},
		{
			name: t('status'),
			key: 'status',
			value: transactionData.status,
			type: 'string',
			inputType: 'select',
			options: [
				{
					label: 'Completed',
					value: 'completed',
					color: '#52BC37',
					image: '/completed.svg',
				},
				{
					label: 'Pending',
					value: 'pending',
					color: '#F4D800',
					image: '/pending.svg',
				},
				{
					label: 'Canceled',
					value: 'canceled',
					color: '#D72828',
					image: '/canceled.svg',
				},
			],
		},
		{
			name: t('type'),
			key: 'type',
			value: transactionData.type,
			type: 'string',
			inputType: 'select',
			options: [
				{
					label: 'Deposit',
					value: 'deposit',
					color: '#52BC37',
				},
				{
					label: 'Withdrawal',
					value: 'withdrawal',
					color: '#000000',
				},
			],
		},
		{
			name: t('method'),
			key: 'method',
			value: transactionData.method,
			type: 'string',
			inputType: 'select',
			options: [
				{
					label: 'Crypto',
					labelImage: '/wallet.svg',
					value: 'walletBTCAddress',
					color: '#000000',
				},
				{
					label: 'Wire transfer',
					labelImage: '/wire-transfer.svg',
					value: 'wireTransfer',
					color: '#000000',
				},
				{
					labelImage: '/paypal.svg',
					value: 'paypalAddress',
				},
				{
					labelImage: '/zelle.svg',
					value: 'zelleTransfer',
				},
			],
		},
		{
			name: t('amount'),
			key: 'amount',
			value: transactionData.amount,
			type: 'string',
		},
		{
			name: t('balance'),
			key: 'balance',
			value: transactionData.balance,
			type: 'string',
		},
	]

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
			<DialogContent sx={{ p: '0px 8px 16px 8px' }}>
				{inputs.map((input, index) => (
					<Box key={index} sx={{ mt: index === 0 ? '8px' : '15px' }}>
						<Typography
							sx={{
								mb: '5px',
								fontFamily: 'Manrope',
								fontSize: '12px',
								fontWeight: 700,
							}}
						>
							{input.name}
						</Typography>

						{input.inputType === 'select' ? (
							<Select
								fullWidth
								variant='standard'
								value={input.value}
								onChange={e =>
									setTransactionData(prev => ({
										...prev,
										[input.key]: e.target.value,
									}))
								}
								displayEmpty
								MenuProps={{
									PaperProps: {
										sx: {
											width: '172px',
										},
									},
								}}
								renderValue={selected => {
									const option = input.options?.find(
										opt => opt.value === selected
									)
									if (!option) return ''

									return (
										<Box
											sx={{
												height: '21.69px',
												px: '5px',
												width: '100px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												gap: '8px',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
												}}
											>
												{option.labelImage && (
													<Box component='img' src={option.labelImage} />
												)}
												<Typography
													sx={{
														fontFamily: 'Manrope',
														fontSize: '13px',
														lineHeight: 1,
														color: option.color,
													}}
												>
													{option.label}
												</Typography>
											</Box>
											{option.image && (
												<Box component='img' src={option.image} />
											)}
										</Box>
									)
								}}
								inputProps={{
									disableUnderline: true,
								}}
								sx={{
									fontSize: '13px',
									fontFamily: 'Manrope',
									p: '2px 5px 1px 5px',
									backgroundColor: '#FFFFFF',
									border: '1px solid #0C3E9C66',
									borderRadius: '8px',
									padding: 0,
									'&::before': {
										borderBottom: 'none !important',
									},
									'&::after': {
										borderBottom: 'none !important',
									},
								}}
							>
								{input.options?.map(option => (
									<MenuItem
										key={option.value.toString()}
										value={option.value.toString()}
										sx={{ px: '5px' }}
									>
										<Box
											sx={{
												width: '100px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												gap: '8px',
											}}
										>
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: '8px',
												}}
											>
												{option.labelImage && (
													<Box component='img' src={option.labelImage} />
												)}
												<Typography
													sx={{
														fontFamily: 'Manrope',
														fontSize: '13px',
														lineHeight: 1,
														color: option.color,
													}}
												>
													{option.label}
												</Typography>
											</Box>
											{option.image && (
												<Box component='img' src={option.image} />
											)}
										</Box>
									</MenuItem>
								))}
							</Select>
						) : (
							<TextField
								fullWidth
								variant='standard'
								type={input.key === 'date' ? 'datetime-local' : 'text'}
								InputProps={{
									disableUnderline: true,
									sx: {
										fontSize: '13px',
										fontFamily: 'Manrope',
										p: '2px 5px 1px 5px',
										backgroundColor: '#FFFFFF',
										border: '1px solid #0C3E9C66',
										borderRadius: '8px',
									},
								}}
								value={input.value}
								onChange={e => {
									const val = e.target.value
									if (
										input.key === 'balance' ||
										input.key === 'balanceBTC' ||
										input.key === 'amount'
									) {
										let cleaned = val.replace(/[^0-9.]/g, '')
										const parts = cleaned.split('.')
										if (parts.length > 2) {
											cleaned = parts[0] + '.' + parts.slice(1).join('')
										}
										setTransactionData(prev => ({
											...prev,
											[input.key]: cleaned,
										}))
									} else {
										setTransactionData(prev => ({
											...prev,
											[input.key]: val,
										}))
									}
								}}
							/>
						)}
					</Box>
				))}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleEditTransaction}
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

export default EditTransactionModal
