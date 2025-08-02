import {
	Box,
	Typography,
	TextField,
	IconButton,
	Autocomplete,
	useMediaQuery,
	Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import { useRef, useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import VerificationBlock from '@/components/VerificationBlock'
import countries from '@/pages/RegisterModal/countries.json'
import { Client, updateProfileField } from '@/api/clientService'

interface Props {
	profile: Client
	setProfile: Dispatch<SetStateAction<Client | undefined>>
	setShowDocument: Dispatch<SetStateAction<boolean>>
}
const UserInfoBlock = ({ profile, setProfile, setShowDocument }: Props) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({})
	const [firstName, setFirstName] = useState(profile.firstName)
	const [lastName, setLastName] = useState(profile.lastName)
	const [email, setEmail] = useState(profile.email)
	const [phone, setPhone] = useState(profile.phone)
	const [country, setCountry] = useState(profile.country)

	const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

	const focusInput = useCallback((key: string) => {
		setTimeout(() => {
			inputRefs.current[key]?.focus()
		}, 0)
	}, [])

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		key: string
	) => {
		if (e.key === 'Enter') {
			setIsEditing(prev => ({
				...prev,
				[key]: !prev[key],
			}))
			if (!isEditing[key]) {
				focusInput(key)
			}
		}
	}

	const handlePhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		setPhone(digits.length === 0 ? '' : `+${digits}`)
	}

	const handleSaveField = async (field: string, value: any) => {
		try {
			await updateProfileField({ [field]: value })

			setProfile(prev => (prev ? { ...prev, [field]: value } : prev))
		} catch (err) {
			console.error('Failed to update field:', err)
		}
	}

	const inputsText = [
		{
			name: t('first name'),
			key: 'firstName',
			value: firstName,
			onchange: setFirstName,
		},
		{
			name: t('last name'),
			key: 'lastName',
			value: lastName,
			onchange: setLastName,
		},
		{ name: t('email'), key: 'email', value: email, onchange: setEmail },
		{
			name: t('telephone'),
			key: 'phone',
			value: phone,
			onchange: handlePhoneChange,
		},
	]

	return (
		<Box
			sx={{
				maxWidth: isMobile ? '100%' : '415px',
				width: '100%',
				boxSizing: 'border-box',
			}}
		>
			{!isMobile && (
				<Box
					sx={{
						width: '150px',
						height: '35px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F0F4FF',
						borderTopRightRadius: '16px',
						borderTopLeftRadius: '16px',
					}}
				>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '18px',
							fontWeight: 500,
							color: '#0246FF',
						}}
					>
						{t('info')}
					</Typography>
				</Box>
			)}

			<Box
				sx={{
					width: '100%',
					minHeight: '594px',
					p: '20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					borderRadius: '16px',
					borderTopLeftRadius: !isMobile ? '0px' : '16px',
					backgroundColor: '#F0F4FF',
					boxSizing: 'border-box',
				}}
			>
				<Box
					sx={{
						width: '100px',
						height: '80px',
						mb: '10px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '20px',
						background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
					}}
				>
					<Box
						component='img'
						src='/person-white.svg'
						sx={{ width: '55px', height: 'auto' }}
					/>
				</Box>
				<VerificationBlock status={profile.verificationStatus} />
				<Typography
					sx={{
						mt: '15px',
						fontFamily: 'Manrope',
						fontSize: '18px',
						fontWeight: 500,
						lineHeight: 1,
					}}
				>
					{profile.firstName} {profile.lastName}
				</Typography>
				{inputsText.map((input, index) => (
					<Box key={index} sx={{ mt: '20px', width: '100%' }}>
						<Typography
							sx={{
								mb: '3px',
								fontFamily: 'Manrope',
								fontSize: '12px',
								color: '#232323',
								opacity: 0.5,
							}}
						>
							{input.name}:
						</Typography>
						<Box
							key={input.key}
							sx={{
								width: 'calc(100% - 20px)',
								height: '32px',
								px: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderRadius: '8px',
								backgroundColor: '#FFFFFF',
							}}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: '5px',
								}}
							>
								<TextField
									variant='standard'
									value={input.value}
									onChange={e => input.onchange(e.target.value)}
									disabled={!isEditing[input.key]}
									inputRef={el => (inputRefs.current[input.key] = el)}
									sx={{ width: isMobile ? '90%' : '250px' }}
									InputProps={{
										disableUnderline: true,
										sx: {
											fontSize: '13px',
											fontFamily: 'Manrope',
											padding: 0,
											backgroundColor: 'transparent',
										},
									}}
									inputProps={{
										onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
											handleKeyDown(e, input.key),
									}}
								/>
								<IconButton
									onClick={async () => {
										if (isEditing[input.key]) {
											try {
												await handleSaveField(input.key, input.value)

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
							</Box>
						</Box>
					</Box>
				))}
				<Box sx={{ mt: '20px', width: '100%' }}>
					<Typography
						sx={{
							mb: '3px',
							fontFamily: 'Manrope',
							fontSize: '12px',
							color: '#232323',
							opacity: 0.5,
						}}
					>
						{t('mycountry')}:
					</Typography>
					<Box
						sx={{
							width: 'calc(100% - 20px)',
							height: '32px',
							px: '10px',
							display: 'flex',
							alignItems: 'center',
							borderRadius: '8px',
							backgroundColor: '#FFFFFF',
						}}
					>
						<Autocomplete
							sx={{
								width: isMobile ? '95%' : '250px',
							}}
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
										onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
											handleKeyDown(e, 'country'),
										disableUnderline: true,
										sx: {
											fontSize: '13px',
											fontFamily: 'Manrope',
											padding: 0,
											backgroundColor: 'transparent',
										},
									}}
								/>
							)}
						/>
						<IconButton
							onClick={async () => {
								if (isEditing.country) {
									await handleSaveField('country', country)
									setIsEditing(prev => ({ ...prev, country: false }))
								} else {
									setIsEditing(prev => ({ ...prev, country: true }))
									focusInput('country')
								}
							}}
							sx={{ ml: 'auto', mr: '-10px' }}
						>
							{isEditing.country ? (
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
					</Box>
				</Box>
				{isMobile && profile.verificationStatus === 'unverified' && (
					<Button
						sx={{
							width: '100%',
							height: '56px',
							mt: '35px',
							border: '1px solid #232323',
							borderRadius: '6px',
							background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
							fontFamily: 'Manrope',
							fontSize: '22px',
							fontWeight: 700,
							textTransform: 'none',
							color: '#FFF',
						}}
						onClick={() => setShowDocument(true)}
					>
						{t('verify')}
					</Button>
				)}
			</Box>
		</Box>
	)
}

export default UserInfoBlock
