import React from 'react'
import { useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	IconButton,
	Typography,
	Checkbox,
	Box,
	CircularProgress,
	Autocomplete,
	FormHelperText,
	Snackbar,
	Alert,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

import countries from './countries.json'
import { useRegisterModal } from './useRegisterModal'
import { AuthModalProps } from './types'
import {
	dialogStyles,
	closeButtonStyles,
	textFieldStyles,
	agreementTextStyles,
	linkStyles,
	primaryButtonStyles,
	secondaryButtonStyles,
	footerTextStyles,
} from './styles'

const RegisterModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
	const { t } = useTranslation()
	const [showSuccessAlert, setShowSuccessAlert] = React.useState(false)

	const {
		isLoginForm,
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		phone,
		country,
		isTermsAccepted,
		loading,
		errors,
		setEmail,
		setPassword,
		setConfirmPassword,
		setFirstName,
		setLastName,
		setPhone,
		setCountry,
		setІsTermsAccepted,
		handlePhoneChange,
		handleFieldChange,
		handleCountryChange,
		handleTermsChange,
		handleSubmit: handleSubmitHook,
		switchAuthMode,
		resetForm,
	} = useRegisterModal()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const result = await handleSubmitHook(e)
		if (result?.success) {
			setShowSuccessAlert(true)
		}
	}

	const handleCloseAlert = () => {
		setShowSuccessAlert(false)
	}

	useEffect(() => {
		if (!open) {
			resetForm()
		}
	}, [open])

	const handleClose = () => {
		resetForm()
		onClose()
	}

	const getTextFieldProps = (fieldName: string) => {
		const hasError = !!errors[fieldName]
		return {
			error: hasError,
			helperText: errors[fieldName],
			FormHelperTextProps: { sx: { color: 'red', mt: 0.5 } },
			sx: {
				...textFieldStyles,
				mb: hasError ? '0px' : '23.901px', // Используем hasError вместо error
				'& .MuiInput-underline:after': {
					borderBottomColor: hasError ? 'red' : undefined,
				},
			},
		}
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth='xs'
				fullWidth
				PaperProps={dialogStyles.PaperProps}
			>
				<IconButton onClick={handleClose} sx={closeButtonStyles}>
					<CloseIcon />
				</IconButton>

				<form onSubmit={handleSubmit}>
					<DialogContent sx={{ mt: '30px', pb: 0 }}>
						{errors.form && (
							<Typography color='error' gutterBottom>
								{errors.form}
							</Typography>
						)}

						{!isLoginForm && (
							<>
								<TextField
									variant='standard'
									fullWidth
									placeholder={t('name')}
									value={firstName}
									onChange={e => handleFieldChange('firstName', e.target.value)}
									{...getTextFieldProps('firstName')}
								/>
								<TextField
									variant='standard'
									fullWidth
									placeholder={t('surname')}
									value={lastName}
									onChange={e => handleFieldChange('lastName', e.target.value)}
									{...getTextFieldProps('lastName')}
								/>
							</>
						)}

						<TextField
							variant='standard'
							fullWidth
							placeholder={isLoginForm ? t('your email') : 'Email'}
							// type='email'
							autoComplete='email'
							value={email}
							onChange={e => handleFieldChange('email', e.target.value)}
							disabled={loading}
							{...getTextFieldProps('email')}
						/>

						{!isLoginForm && (
							<>
								<TextField
									variant='standard'
									fullWidth
									placeholder={t('phone number')}
									value={phone}
									onChange={e => handleFieldChange('phone', e.target.value)}
									{...getTextFieldProps('phone')}
								/>

								<Autocomplete
									options={countries}
									getOptionLabel={option => option.label}
									value={country}
									onChange={(_, newValue) => handleCountryChange(newValue)}
									renderInput={params => (
										<TextField
											{...params}
											variant='standard'
											placeholder={t('country')}
											error={!!errors.country}
											helperText={errors.country}
											FormHelperTextProps={{ sx: { color: 'red', mt: 0.5 } }}
											sx={{
												...textFieldStyles,
												mb: !!errors.country ? '0px' : '23.901px',
												'& .MuiInput-underline:after': {
													borderBottomColor: errors.country ? 'red' : undefined,
												},
											}}
										/>
									)}
								/>
							</>
						)}

						<TextField
							variant='standard'
							fullWidth
							placeholder={isLoginForm ? t('password') : t('make up password')}
							type='password'
							autoComplete={isLoginForm ? 'current-password' : 'new-password'}
							value={password}
							onChange={e => handleFieldChange('password', e.target.value)}
							disabled={loading}
							{...getTextFieldProps('password')}
						/>

						{!isLoginForm && (
							<>
								<TextField
									variant='standard'
									fullWidth
									placeholder={t('repeat password')}
									type='password'
									autoComplete='new-password'
									value={confirmPassword}
									onChange={e =>
										handleFieldChange('confirmPassword', e.target.value)
									}
									disabled={loading}
									{...getTextFieldProps('confirmPassword')}
								/>

								<Box
									sx={{
										display: 'flex',
										alignItems: 'flex-start',
										mb: errors.terms ? '4px' : '23.901px',
									}}
								>
									<Checkbox
										checked={isTermsAccepted}
										onChange={() => handleTermsChange(!isTermsAccepted)}
										disabled={loading}
										sx={{ mt: '-9px', ml: '-11px' }}
									/>
									<Typography sx={agreementTextStyles}>
										{t('aknowledge')}{' '}
										<span style={linkStyles}>{t('agreement')}</span> {t('and')}{' '}
										<span style={linkStyles}>{t('statement')}</span>{' '}
										{t('legal age')}
									</Typography>
								</Box>
								{errors.terms && (
									<FormHelperText error sx={{ mt: -1, mb: 1 }}>
										{errors.terms}
									</FormHelperText>
								)}
							</>
						)}

						{isLoginForm && (
							<Typography sx={{ ...footerTextStyles, cursor: 'pointer' }}>
								{t('forgot password')}
							</Typography>
						)}
					</DialogContent>

					<DialogActions sx={{ flexDirection: 'column', px: 3, pb: 3, pt: 0 }}>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							disabled={loading}
							sx={primaryButtonStyles}
						>
							{loading ? (
								<CircularProgress size={24} color='inherit' />
							) : isLoginForm ? (
								t('log in')
							) : (
								t('register')
							)}
						</Button>

						{isLoginForm && (
							<Typography sx={footerTextStyles}>
								{t('log in button')}{' '}
								<span
									style={{ textDecoration: 'underline', cursor: 'pointer' }}
								>
									{t('personal data')}
								</span>
							</Typography>
						)}

						<Typography sx={{ ...footerTextStyles, cursor: 'pointer' }}>
							{isLoginForm ? t('no account') : t('have account')}
						</Typography>

						<Button
							fullWidth
							variant='outlined'
							onClick={switchAuthMode}
							disabled={loading}
							sx={secondaryButtonStyles}
						>
							{isLoginForm ? t('register') : t('log in')}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
			<Snackbar
				open={showSuccessAlert}
				autoHideDuration={5000}
				onClose={handleCloseAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				style={{ zIndex: 15000 }}
			>
				<Alert
					icon={<CheckIcon fontSize='inherit' />}
					severity='success'
					variant='filled'
					style={{ zIndex: 15000 }}
				>
					{t('registration_success')} {t('please_login')}
				</Alert>
			</Snackbar>
		</>
	)
}

export default React.memo(RegisterModal)
