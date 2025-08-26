import {
	Box,
	Checkbox,
	IconButton,
	MenuItem,
	Select,
	TextField,
	Typography,
	Autocomplete,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import LabelIcon from '@mui/icons-material/Label'
import { Loader } from '@/components'
import WalletModal from '../WalletModal'
import WireTransferModal from '../WireTransferModal'
import ZelleModal from '../ZelleModal'
import countries from '@/pages/RegisterModal/countries.json'
import { useCallback, useRef, useState, Dispatch, SetStateAction } from 'react'
import { Client, updateClientField } from '@/api/clientService'
import { useTranslation } from 'react-i18next'
import { useModals } from '../hooks/useModals'

interface Props {
	client: Client
	loading: boolean
	error: string
	id: string | undefined
	setClient: Dispatch<SetStateAction<Client | undefined>>
}

type Option = {
	label?: string
	labelImage?: string
	value: string
	color?: string
	image?: string
}

type InputField = {
	name?: string
	key: string
	value: any
	onchange?: (val: string) => void
	type?: string
	inputType?: string
	options?: Option[]
	img?: string
}

const ClientEditForm = ({ client, loading, error, id, setClient }: Props) => {
	const { t } = useTranslation()
	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
	const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({})
	const [firstName, setFirstName] = useState(client.firstName)
	const [lastName, setLastName] = useState(client.lastName)
	const [email, setEmail] = useState(client.email)
	const [phone, setPhone] = useState(client.phone)
	const [verificationStatus, setVerificationStatus] = useState(
		client.verificationStatus
	)
	const [walletBTCAddress, setWalletBTCAddress] = useState(
		client.walletBTCAddress
	)
	const [wireTransferFirstName, setWireTransferFirstName] = useState(
		client.wireTransfer.firstName
	)
	const [wireTransferLastName, setWireTransferLastName] = useState(
		client.wireTransfer.lastName
	)
	const [wireTransferAccountNumber, setWireTransferAccountNumber] = useState(
		client.wireTransfer.accountNumber
	)
	const [wireTransferRoutingNumber, setWireTransferRoutingNumber] = useState(
		client.wireTransfer.routingNumber
	)
	const [wireTransferBankName, setWireTransferBankName] = useState(
		client.wireTransfer.bankName
	)
	const [wireTransferAddress, setWireTransferAddress] = useState(
		client.wireTransfer.address
	)
	const [paypal, setPaypal] = useState(client.paypalAddress)
	const [zelleName, setZelleName] = useState(client.zelleTransfer.recipientName)
	const [zelleEmail, setZelleEmail] = useState(client.zelleTransfer.email)
	const [zellePhone, setZellePhone] = useState(client.zelleTransfer.phone)
	const [country, setCountry] = useState(client.country)
	const [password, setPassword] = useState('')
	const [balance, setBalance] = useState(client.balance)
	const [balanceBTC, setBalanceBTC] = useState(
		Number(client.balanceBTC).toFixed(8).toString()
	)
	const [showBTCBalance, setShowBTCBalance] = useState(client.showBTCBalance)
	const [isTransactionAllowed, setIsTransactionAllowed] = useState(
		client.isTransactionAllowed
	)

	const {
		isWalletModalOpen,
		setIsWalletModalOpen,
		modalInputKey,
		setModalInputKey,
		modalInputValue,
		setModalInputValue,
		modalName,
		setModalName,
		modalWireValues,
		setModalWireValues,
		modalZelleValues,
		setModalZelleValues,
	} = useModals()

	const focusInput = useCallback((key: string) => {
		setTimeout(() => {
			inputRefs.current[key]?.focus()
		}, 0)
	}, [])

	// const handleKeyDown = (
	// 	e: React.KeyboardEvent<HTMLInputElement>,
	// 	key: string
	// ) => {
	// 	if (e.key === 'Enter') {
	// 		e.preventDefault()
	// 		setIsEditing(prev => ({
	// 			...prev,
	// 			[key]: !prev[key],
	// 		}))
	// 		if (!isEditing[key]) {
	// 			focusInput(key)
	// 		}
	// 	}
	// }

	const handlePhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		setPhone(digits.length === 0 ? '' : `+${digits}`)
	}

	const handleModalSave = async () => {
		if (!id) return

		try {
			if (modalInputKey === 'walletBTCAddress') {
				await handleSaveField('walletBTCAddress', modalInputValue)
				setWalletBTCAddress(modalInputValue)
			} else if (modalInputKey === 'paypal') {
				await handleSaveField('paypalAddress', modalInputValue)
				setPaypal(modalInputValue)
			} else if (modalInputKey === 'zelle') {
				if (modalInputKey === 'zelle') {
					const updatedZelleTransfer = {
						recipientName: modalZelleValues.name,
						email: modalZelleValues.email,
						phone: modalZelleValues.phone,
					}

					await updateClientField(id, { zelleTransfer: updatedZelleTransfer })

					setZelleName(updatedZelleTransfer.recipientName)
					setZelleEmail(updatedZelleTransfer.email)
					setZellePhone(updatedZelleTransfer.phone)
				}
			} else if (modalInputKey === 'wire transfer') {
				const updatedWireTransfer = {
					firstName: modalWireValues.firstName,
					lastName: modalWireValues.lastName,
					accountNumber: modalWireValues.accountNumber,
					routingNumber: modalWireValues.routingNumber,
					bankName: modalWireValues.bankName,
					address: modalWireValues.address,
				}

				// Отправляем обновление целиком
				await updateClientField(id, { wireTransfer: updatedWireTransfer })

				// Обновляем локальный стейт
				setWireTransferFirstName(updatedWireTransfer.firstName)
				setWireTransferLastName(updatedWireTransfer.lastName)
				setWireTransferAccountNumber(updatedWireTransfer.accountNumber)
				setWireTransferRoutingNumber(updatedWireTransfer.routingNumber)
				setWireTransferBankName(updatedWireTransfer.bankName)
				setWireTransferAddress(updatedWireTransfer.address)
			}

			setIsWalletModalOpen(false)
		} catch (err) {
			console.error('Failed to save modal changes:', err)
		}
	}

	const handleSaveField = async (field: string, value: any) => {
		if (!id) return

		try {
			await updateClientField(id, { [field]: value })

			setClient(prev => (prev ? { ...prev, [field]: value } : prev))
		} catch (err) {
			console.error('Failed to update field:', err)
		}
	}

	const inputs: InputField[] = [
		{
			name: t('first name'),
			key: 'firstName',
			value: firstName,
			onchange: (val: string) => setFirstName(val),
			type: 'string',
		},
		{
			name: t('last name'),
			key: 'lastName',
			value: lastName,
			onchange: (val: string) => setLastName(val),
			type: 'string',
		},
		{
			name: t('email'),
			key: 'email',
			value: email,
			onchange: (val: string) => setEmail(val),
			type: 'string',
		},
		{
			name: t('telephone'),
			key: 'phone',
			value: phone,
			onchange: (val: string) => handlePhoneChange(val),
			type: 'string',
		},
		{
			name: t('verification status'),
			key: 'verificationStatus',
			value: verificationStatus,
			onchange: (val: string) => setVerificationStatus(val),
			type: 'string',
			inputType: 'select',
			options: [
				{ label: t('verified'), value: 'verified', color: '#52BC37' },
				{ label: t('pending'), value: 'pending', color: '#F4D800' },
				{ label: t('no-verified'), value: 'unverified', color: '#D72828' },
			],
		},
		{
			name: t('wallet'),
			key: 'walletBTCAddress',
			value: walletBTCAddress,
			onchange: (val: string) => setWalletBTCAddress(val),
			inputType: 'modal',
		},
		{
			name: 'Wire transfer',
			key: 'wire transfer',
			value: `${wireTransferFirstName || ''} ${wireTransferLastName || ''}`,
			inputType: 'modal',
		},
		{
			img: '/paypal.svg',
			key: 'paypal',
			value: paypal,
			onchange: (val: string) => setPaypal(val),
			inputType: 'modal',
		},
		{
			img: '/zelle.svg',
			key: 'zelle',
			value: `${zelleName || ''} ${zelleEmail || ''}`,
			inputType: 'modal',
		},
		{
			name: t('mycountry'),
			key: 'country',
			value: country,
			onchange: (val: string) => setCountry(val),
			type: 'string',
		},
		{
			name: t('password'),
			key: 'password',
			value: password,
			onchange: (val: string) => setPassword(val),
			type: 'string',
		},
		{
			name: t('balanceUSD'),
			key: 'balance',
			value: balance,
			onchange: (val: string) => setBalance(val),
			type: 'string',
		},
		// {
		// 	name: t('balanceBTC'),
		// 	key: 'balanceBTC',
		// 	value: balanceBTC,
		// 	onchange: (val: string) => setBalanceBTC(val),
		// 	type: 'string',
		// },
	]

	if (loading) return <Loader />
	if (error || !client) return <Typography color='error'>{error}</Typography>

	return (
		<Box sx={{ maxWidth: '390px', width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					gap: '15px',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '22px',
						fontWeight: 700,
						lineHeight: 1,
						textTransform: 'uppercase',
						whiteSpace: 'nowrap',
					}}
				>
					{t('client information')}
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '13px',
						fontWeight: 400,
						lineHeight: 1,
						color: '#232323',
						opacity: 0.5,
						whiteSpace: 'nowrap',
					}}
				>
					{client.firstName} {client.lastName}
				</Typography>
			</Box>

			<Box
				sx={{
					maxWidth: '375px',
					width: '100%',
					mt: '30px',
					boxSizing: 'border-box',
				}}
			>
				{inputs.map(input => (
					<Box
						key={input.key}
						sx={{
							width: '100%',
							height: '32px',
							px: '10px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							borderRadius: '8px',
							backgroundColor: '#F7F9FF',
							mb: '10px',
							boxSizing: 'border-box',
						}}
					>
						<Box sx={{ display: 'flex', gap: '5px' }}>
							{input.key === 'walletBTCAddress' && (
								<Box component='img' src='/wallet.svg' />
							)}
							{input.key === 'wire transfer' && (
								<Box component='img' src='/wire-transfer.svg' />
							)}
							{input.img ? (
								<Box component='img' src={input.img} />
							) : (
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '13px',
										fontWeight: 700,
									}}
								>
									{input.name}
								</Typography>
							)}
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
							{input.inputType === 'modal' ? (
								<Typography
									sx={{
										width: '165px',
										fontFamily: 'Manrope',
										fontSize: '13px',
										color: 'rgba(0, 0, 0, 0.38)',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{input.key === 'walletBTCAddress'
										? input.value
										: input.key === 'paypal'
										? input.value
										: 'details...'}
								</Typography>
							) : input.key === 'verificationStatus' ? (
								<Select
									variant='standard'
									value={verificationStatus}
									onChange={e => input.onchange?.(e.target.value)}
									displayEmpty
									inputRef={el => (inputRefs.current[input.key] = el)}
									onKeyDown={e => {
										if (e.key === 'Enter') {
											e.preventDefault()
											setIsEditing(prev => ({
												...prev,
												[input.key]: false,
											}))
										}
									}}
									MenuProps={{
										PaperProps: {
											sx: {
												width: '172px',
												ml: '-12px',
											},
										},
										onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => {
											if (!isEditing[input.key]) {
												e.preventDefault()
												e.stopPropagation()
											}
										},
									}}
									renderValue={selected => {
										const option = input.options?.find(
											opt => opt.value.toString() === selected
										)
										if (!option) return ''

										return (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'cente',
													justifyContent: 'space-between',
													gap: '8px',
													pointerEvents: isEditing[input.key] ? 'auto' : 'none',
												}}
											>
												<Typography
													sx={{
														fontFamily: 'Manrope',
														fontSize: '13px',
														color: option.color,
														opacity: '1 !important',
													}}
												>
													{option.label}
												</Typography>

												<LabelIcon
													sx={{
														width: '18px',
														height: '18px',
														color: option.color,
														transform: 'rotate(90deg)',
														opacity: '1 !important',
													}}
												/>
											</Box>
										)
									}}
									inputProps={{
										disableUnderline: true,
										readOnly: !isEditing[input.key],
									}}
									sx={{
										width: '165px',
										fontSize: '13px',
										fontFamily: 'Manrope',
										padding: 0,
										backgroundColor: 'transparent',
										'& .MuiSelect-icon': {
											display: isEditing[input.key] ? 'block' : 'none',
										},
										'&::before': {
											borderBottom: 'none !important',
										},
										'&::after': {
											borderBottom: 'none !important',
										},
										'&.Mui-disabled': {
											opacity: 1,
											color: 'inherit',
										},
										// Запрещаем события мыши при неактивном состоянии
										pointerEvents: isEditing[input.key] ? 'auto' : 'none',
										cursor: isEditing[input.key] ? 'pointer' : 'default',
									}}
								>
									{input.options?.map(option => (
										<MenuItem
											key={option.value.toString()}
											value={option.value.toString()}
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<Typography
												sx={{
													fontFamily: 'Manrope',
													fontSize: '13px',
													color: option.color,
												}}
											>
												{option.label}
											</Typography>
											<LabelIcon
												sx={{
													width: '18px',
													height: '18px',
													color: option.color,
													transform: 'rotate(90deg)',
												}}
											/>
										</MenuItem>
									))}
								</Select>
							) : input.key === 'country' ? (
								<Autocomplete
									freeSolo
									options={countries.map(option => option.label)}
									value={country}
									onChange={(event, newValue) => setCountry(newValue || '')}
									disabled={!isEditing.country}
									renderInput={params => (
										<TextField
											{...params}
											variant='standard'
											inputRef={el => (inputRefs.current['country'] = el)}
											InputProps={{
												...params.InputProps,
												// onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
												// 	handleKeyDown(e, 'country'),
												disableUnderline: true,
												sx: {
													width: '165px',
													fontSize: '13px',
													fontFamily: 'Manrope',
													padding: 0,
													backgroundColor: 'transparent',
												},
											}}
										/>
									)}
								/>
							) : (
								<TextField
									variant='standard'
									value={input.value}
									onChange={e => {
										const val = e.target.value
										if (input.key === 'balance' || input.key === 'balanceBTC') {
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
									disabled={!isEditing[input.key]}
									inputRef={el => (inputRefs.current[input.key] = el)}
									InputProps={{
										disableUnderline: true,
										type: input.type ?? 'text',
										sx: {
											width: '165px',
											fontSize: '13px',
											fontFamily: 'Manrope',
											padding: 0,
											backgroundColor: 'transparent',
										},
									}}
									inputProps={
										{
											// onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
											// 	handleKeyDown(e, input.key),
										}
									}
								/>
							)}
							{input.inputType === 'modal' ? (
								<IconButton
									onClick={() => {
										setModalInputKey(input.key)
										if (input.key === 'wire transfer') {
											setModalWireValues({
												firstName: wireTransferFirstName,
												lastName: wireTransferLastName,
												accountNumber: wireTransferAccountNumber,
												routingNumber: wireTransferRoutingNumber,
												bankName: wireTransferBankName,
												address: wireTransferAddress,
											})
										} else if (input.key === 'zelle') {
											setModalZelleValues({
												name: zelleName,
												email: zelleEmail,
												phone: zellePhone,
											})
										} else {
											setModalInputValue(input.value)
										}
										setIsWalletModalOpen(true)
										setModalName(input.key)
									}}
									sx={{ mr: '-10px' }}
								>
									<EditIcon
										sx={{ width: '19px', height: '19px', color: '#0246FF' }}
									/>
								</IconButton>
							) : (
								<IconButton
									onClick={async () => {
										if (isEditing[input.key]) {
											try {
												let valueToSave: any
												if (input.key === 'firstName') valueToSave = firstName
												else if (input.key === 'lastName')
													valueToSave = lastName
												else if (input.key === 'email') valueToSave = email
												else if (input.key === 'phone') valueToSave = phone
												else if (input.key === 'country') valueToSave = country
												else if (input.key === 'password')
													valueToSave = password
												else if (input.key === 'balance')
													valueToSave = Number(balance).toFixed(2)
												else if (input.key === 'balanceBTC')
													valueToSave = Number(balanceBTC).toFixed(8)
												else if (input.key === 'verificationStatus')
													valueToSave = verificationStatus

												await handleSaveField(input.key, valueToSave)

												setIsEditing(prev => ({
													...prev,
													[input.key]: false,
												}))
											} catch (err) {
												console.error('Failed to save field:', err)
											}
										} else {
											setIsEditing(prev => ({
												...prev,
												[input.key]: true,
											}))
											focusInput(input.key)
										}
									}}
									sx={{ mr: '-10px' }}
								>
									{isEditing[input.key] ? (
										<CheckIcon
											sx={{
												width: '19px',
												height: '19px',
												color: '#52BC37',
											}}
										/>
									) : (
										<EditIcon
											sx={{
												width: '19px',
												height: '19px',
												color: '#0246FF',
											}}
										/>
									)}
								</IconButton>
							)}
						</Box>
					</Box>
				))}

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Checkbox
						checked={showBTCBalance}
						onChange={async () => {
							const newValue = !showBTCBalance
							try {
								await handleSaveField('showBTCBalance', newValue)
								setShowBTCBalance(newValue)
							} catch (err) {
								console.error('Failed to update showBTCBalance:', err)
							}
						}}
					/>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '13px',
							fontWeight: 700,
							lineHeight: 1,
						}}
					>
						{t('showBTCBalance')}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Checkbox
						checked={isTransactionAllowed}
						onChange={async () => {
							const newValue = !isTransactionAllowed
							try {
								await handleSaveField('isTransactionAllowed', newValue)
								setIsTransactionAllowed(newValue)
							} catch (err) {
								console.error('Failed to update isTransactionAllowed:', err)
							}
						}}
					/>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '13px',
							fontWeight: 700,
							lineHeight: 1,
						}}
					>
						{t('allowTransactions')}
					</Typography>
				</Box>
			</Box>
			<WalletModal
				open={isWalletModalOpen}
				onClose={() => setIsWalletModalOpen(false)}
				onSave={handleModalSave}
				value={modalInputValue}
				onChange={setModalInputValue}
				name={modalName}
			/>
			<WireTransferModal
				open={isWalletModalOpen && modalInputKey === 'wire transfer'}
				onClose={() => setIsWalletModalOpen(false)}
				onSave={handleModalSave}
				values={modalWireValues}
				onChange={setModalWireValues}
			/>
			<ZelleModal
				open={isWalletModalOpen && modalInputKey === 'zelle'}
				onClose={() => setIsWalletModalOpen(false)}
				onSave={handleModalSave}
				values={modalZelleValues}
				onChange={setModalZelleValues}
			/>
		</Box>
	)
}

export default ClientEditForm
