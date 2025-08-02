import { Box, IconButton, Typography, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CreateIcon from '@mui/icons-material/Create'
import { useEffect, useState, useMemo } from 'react'
import { getClients, Client } from '@/api/clientService'
import { Loader } from '@/components'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'

const ClientsPage = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [clients, setClients] = useState<Client[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const data = await getClients()
				setClients(data)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch clients:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchClients()
	}, [t])

	const filteredClients = useMemo(() => {
		const value = searchValue.trim().toLowerCase()
		if (!value) return clients

		return clients.filter(client => {
			const balanceString = client.balance.toString().toLowerCase()

			return (
				client._id.toLowerCase().includes(value) ||
				client.firstName?.toLowerCase().includes(value) ||
				client.lastName?.toLowerCase().includes(value) ||
				client.walletBTCAddress?.toLowerCase().includes(value) ||
				balanceString.includes(value)
			)
		})
	}, [clients, searchValue])

	if (loading) return <Loader />
	if (error) return <Typography color='error'>{error}</Typography>

	return (
		<Box>
			<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
				<span style={{ opacity: 0.5 }}>{t('admin menu')}</span> | {t('clients')}
			</Typography>

			<Box sx={{ mt: '30px' }}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '22px',
								fontWeight: 700,
								lineHeight: 1,
								textTransform: 'uppercase',
							}}
						>
							{t('clients')}
						</Typography>
						<Typography
							sx={{
								fontFamily: 'Manrope',
								fontSize: '14px',
								fontWeight: 400,
								lineHeight: 1,
								color: '#232323',
								opacity: 0.5,
							}}
						>
							{filteredClients.length} {t('found')}
						</Typography>
					</Box>

					<Box
						sx={{
							width: '258px',
							height: '32px',
							px: '10px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							border: '0.5px solid #23232366',
							borderRadius: '32px',
							boxSizing: 'border-box',
						}}
					>
						<TextField
							variant='standard'
							placeholder={t('search')}
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
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
								sx: {
									width: '200px',
									height: '21px',
								},
							}}
						/>
						<SearchIcon sx={{ color: '#0246FF' }} />
					</Box>
				</Box>

				<Box sx={{ mt: '30px' }}>
					<Box
						sx={{
							height: '32px',
							px: '11px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							backgroundColor: '#F7F9FF',
							borderRadius: '8px',
						}}
					>
						{[
							'Id',
							t('first name'),
							t('last name'),
							t('wallet'),
							t('balance'),
						].map((text, index) => (
							<Typography
								key={index}
								sx={{
									width:
										index === 0
											? '20px'
											: index === 3
											? '250px'
											: index === 4
											? '105px'
											: '70px',
									fontFamily: 'Manrope',
									fontSize: '12px',
									fontWeight: 700,
								}}
							>
								{text}
							</Typography>
						))}
					</Box>

					{filteredClients.map((client, index) => (
						<Box
							key={client._id}
							sx={{
								mt: '12px',
								height: '32px',
								px: '10px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderRadius: '8px',
								border: '0.5px solid #9eb2d7',
								backgroundColor: '#FFFFFF',
							}}
						>
							<Typography
								sx={{ width: '20px', fontFamily: 'Manrope', fontSize: '12px' }}
							>
								{index + 1}
							</Typography>
							<Typography
								sx={{ width: '70px', fontFamily: 'Manrope', fontSize: '12px' }}
							>
								{client.firstName}
							</Typography>
							<Typography
								sx={{ width: '70px', fontFamily: 'Manrope', fontSize: '12px' }}
							>
								{client.lastName}
							</Typography>
							<Typography
								sx={{ width: '250px', fontFamily: 'Manrope', fontSize: '12px' }}
							>
								{client.walletBTCAddress || 'N/A'}
							</Typography>
							<Box
								sx={{
									width: '105px',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Typography sx={{ fontFamily: 'Manrope', fontSize: '12px' }}>
									{Number(client.balance).toFixed(2)}
								</Typography>
								<IconButton onClick={() => navigate(`/clients/${client._id}`)}>
									<CreateIcon
										sx={{ width: '18px', height: '18px', color: '#0246FF' }}
									/>
								</IconButton>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default ClientsPage
