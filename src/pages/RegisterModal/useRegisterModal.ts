import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryOption } from './types'
import routes from '@/router/routes.json'
import {
	registerUser,
	loginUser,
	storeTokens,
	getUserData,
} from '@/api/authService'
import { useTranslation } from 'react-i18next'

export const useRegisterModal = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [country, setCountry] = useState<CountryOption | null>(null)
	const [isTermsAccepted, setІsTermsAccepted] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const resetForm = () => {
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setFirstName('')
		setLastName('')
		setPhone('')
		setCountry(null)
		setІsTermsAccepted(false)
		setErrors({})
	}

	const validateForm = () => {
		const newErrors: Record<string, string> = {}

		if (!email) newErrors.email = t('email required')
		if (!password) newErrors.password = t('password required')

		if (!isLoginForm) {
			if (!firstName) newErrors.firstName = t('name required')
			if (!lastName) newErrors.lastName = t('surname required')
			if (!phone) newErrors.phone = t('phone required')
			if (!country) newErrors.country = t('country required')
			if (password !== confirmPassword) {
				newErrors.confirmPassword = t('passwords do not match')
			}
			if (!isTermsAccepted) {
				newErrors.terms = t('agree to terms')
			}
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handlePhoneChange = (value: string) => {
		const digits = value.replace(/\D/g, '')
		setPhone(digits.length === 0 ? '' : `+${digits}`)
	}

	const switchAuthMode = () => {
		setIsLoginForm(!isLoginForm)
		setErrors({})
		resetForm()
	}

	const handleFieldChange = (field: string, value: string) => {
		setErrors(prev => {
			const newErrors = { ...prev }
			delete newErrors[field]
			return newErrors
		})

		switch (field) {
			case 'email':
				setEmail(value)
				break
			case 'password':
				setPassword(value)
				break
			case 'confirmPassword':
				setConfirmPassword(value)
				break
			case 'firstName':
				setFirstName(value)
				break
			case 'lastName':
				setLastName(value)
				break
			case 'phone':
				handlePhoneChange(value)
				break
			default:
				break
		}
	}

	const handleCountryChange = (newValue: CountryOption | null) => {
		setErrors(prev => {
			const newErrors = { ...prev }
			delete newErrors['country']
			return newErrors
		})
		setCountry(newValue)
	}

	const handleTermsChange = (value: boolean) => {
		setErrors(prev => {
			const newErrors = { ...prev }
			delete newErrors['terms']
			return newErrors
		})
		setІsTermsAccepted(value)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setErrors({})

		if (!validateForm()) {
			setLoading(false)
			return
		}

		try {
			if (isLoginForm) {
				const loginData = { email, password }
				const tokens = await loginUser(loginData)
				storeTokens(tokens)
				await new Promise(resolve => setTimeout(resolve, 500))
				const userData = getUserData()
				navigate(
					userData?.roles?.includes('user')
						? routes.HomePage.path
						: routes.ClientsPage.path
				)
			} else {
				if (!country) throw new Error(t('country required'))

				const registerData = {
					firstName,
					lastName,
					email,
					phone,
					country: country.label,
					password,
					isTermsAccepted,
				}

				const tokens = await registerUser(registerData)
				await new Promise(resolve => setTimeout(resolve, 500))
				setIsLoginForm(true) // Переключаем на форму входа
				resetForm()
				return { success: true } // Возвращаем успешный статус
			}
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || err.message

			if (
				errorMessage.includes('пароль') ||
				errorMessage.includes('password')
			) {
				setErrors({ password: t('incorrect password') })
			} else if (
				errorMessage.includes('Пользователь') ||
				errorMessage.includes('User')
			) {
				setErrors({ email: t('user not found') })
			} else {
				setErrors({ form: errorMessage })
			}
		} finally {
			setLoading(false)
		}
	}

	return {
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
		handleSubmit,
		switchAuthMode,
		resetForm,
	}
}
