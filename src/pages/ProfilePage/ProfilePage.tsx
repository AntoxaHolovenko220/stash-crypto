import { useEffect, useState } from 'react'
import { Box, Typography, useMediaQuery, Button } from '@mui/material'
import { Loader } from '@/components'
import { useTranslation } from 'react-i18next'
import { getProfile, Client } from '@/api/clientService'
import UserInfoBlock from './UserInfoBlock'
import DocumentVerificationBlock from './DocumentVerificationBlock'
import zIndex from '@mui/material/styles/zIndex'
import DocumentsModal, {
	DocumentInterface,
} from '@/components/DocumentsModal/DocumentsModal'
import termsData from '../../documents/terms_and_conditions.json'
import publicOffer from '../../documents/public_offer.json'
import privatePolicy from '../../documents/private_policy.json'
import kycPolicy from '../../documents/kyc_policy.json'
import disclaimer from '../../documents/disclaimer.json'
import amlPolicy from '../../documents/aml_privacy.json'
import FAQ from '../../documents/FAQ.json'

const ProfilePage = () => {
	const { t } = useTranslation()
	const [profile, setProfile] = useState<Client>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [showDocument, setShowDocument] = useState(false)

	const [documentsModal, setDocumentsModal] = useState(false)
	const [data, setData] = useState<DocumentInterface>()

	const isMobile = useMediaQuery('(max-width:480px)')

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data = await getProfile()
				setProfile(data)
			} catch (err) {
				setError(t('error occurred'))
				console.error('Failed to fetch profile:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [t])

	const miniButtonStyles = {
		maxWidth: isMobile ? '157px' : '220px',
		width: '100%',
		minHeight: isMobile ? '36px' : '48px',
		height: 'fit-content',
		borderRadius: '8px',
		fontFamily: 'Manrope',
		fontSize: isMobile ? '12px' : '16px',
		fontWeight: 400,
		color: '#FFFFFF',
		textTransform: 'none',
		border: '1px solid #414141',
		boxShadow: 'none',
		background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
	}

	if (loading) return <Loader />
	if (error) return <Typography color='error'>{error}</Typography>
	if (!profile) return <Typography>{t('error occurred')}</Typography>

	return (
		<Box
			sx={{
				minHeight: '100%',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'space-between',
			}}
		>
			<Box>
				<Typography sx={{ ml: '2px', fontFamily: 'Manrope', fontSize: '14px' }}>
					<span style={{ opacity: 0.5 }}>{t('home')}</span> | {t('profile')}
				</Typography>
				<Box
					sx={{
						mt: '30px',
						display: 'flex',
						gap: '20px',
						justifyContent: 'space-around',
						boxShadow: 'border-box',
					}}
				>
					{!showDocument && (
						<UserInfoBlock
							profile={profile}
							setProfile={setProfile}
							setShowDocument={setShowDocument}
						/>
					)}
					{profile.verificationStatus === 'unverified' && !isMobile && (
						<DocumentVerificationBlock
							setProfile={setProfile}
							setShowDocument={setShowDocument}
						/>
					)}
					{showDocument && (
						<DocumentVerificationBlock
							setProfile={setProfile}
							setShowDocument={setShowDocument}
						/>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default ProfilePage
