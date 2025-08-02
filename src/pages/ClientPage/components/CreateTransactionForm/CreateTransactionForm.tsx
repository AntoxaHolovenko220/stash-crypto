import {
	createAdminTransaction,
	TransactionData,
} from '@/api/transactionService'
import {
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
	onchange: (val: string) => void
	type: string
	inputType?: 'select'
	options?: Option[]
}

interface Props {
	clientId: string
	onTransactionCreated?: (newTransaction: TransactionData) => void
}

const CreateTransactionForm = ({ clientId, onTransactionCreated }: Props) => {
	const { t } = useTranslation()

	const [transactionId, setTransactionId] = useState('')
	const [date, setDate] = useState('')
	const [status, setStatus] = useState('pending')
	const [type, setType] = useState('deposit')
	const [method, setMethod] = useState('walletBTCAddress')
	const [amount, setAmount] = useState('')
	const [balance, setBalance] = useState('')
	const [statusTransaction, setStatusTransaction] = useState('canceled')

	const resetForm = () => {
		setTransactionId('')
		setDate('')
		setStatus('pending')
		setType('deposit')
		setMethod('walletBTCAddress')
		setAmount('')
		setBalance('')
		setStatusTransaction('canceled')
	}

	const handleCreateTransaction = async () => {
		try {
			const result = await createAdminTransaction(clientId, {
				type,
				amount: Number(amount).toFixed(2),
				// balance: Number(balance).toFixed(2),
				method,
				date,
				status,
				transactionId,
			})

			onTransactionCreated?.(result)

			resetForm()
		} catch (err) {
			console.error(err)
			alert('Failed to create transaction')
		}
	}

	const inputs: InputField[] = [
		{
			name: t('id transaction'),
			key: 'id transaction',
			value: transactionId,
			onchange: (val: string) => setTransactionId(val),
			type: 'string',
		},
		{
			name: t('date'),
			key: 'date',
			value: date,
			onchange: (val: string) => setDate(val),
			type: 'string',
		},
		{
			name: t('status'),
			key: 'status',
			value: status,
			onchange: (val: string) => setStatus(val),
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
			value: type,
			onchange: (val: string) => setType(val),
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
			value: method,
			onchange: (val: string) => setMethod(val),
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
			value: amount,
			onchange: (val: string) => setAmount(val),
			type: 'string',
		},
		// {
		// 	name: t('balance'),
		// 	key: 'balance',
		// 	value: balance,
		// 	onchange: (val: string) => setBalance(val),
		// 	type: 'string',
		// },
	]

	return (
		<Box sx={{ maxWidth: '355px', width: '100%' }}>
			<Typography
				sx={{
					fontFamily: 'Manrope',
					fontSize: '22px',
					fontWeight: 700,
					lineHeight: 1,
					textTransform: 'uppercase',
				}}
			>
				{t('create transaction')}
			</Typography>

			{inputs.map((input, index) => (
				<Box key={index} sx={{ mt: index === 0 ? '25px' : '15px' }}>
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
							onChange={e => input.onchange?.(e.target.value)}
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
											sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
										{option.image && <Box component='img' src={option.image} />}
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
											sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
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
										{option.image && <Box component='img' src={option.image} />}
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
									input.onchange?.(cleaned)
								} else {
									input.onchange?.(val)
								}
							}}
						/>
					)}
				</Box>
			))}
			<Button
				sx={{
					width: '100%',
					height: '48px',
					mt: '40px',
					border: '1px solid #232323',
					borderRadius: '6px',
					background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
					fontFamily: 'Manrope',
					fontSize: '18px',
					fontWeight: 700,
					textTransform: 'none',
					color: '#FFF',
				}}
				onClick={() => handleCreateTransaction()}
			>
				{t('create transaction')}
			</Button>
		</Box>
	)
}

export default CreateTransactionForm
