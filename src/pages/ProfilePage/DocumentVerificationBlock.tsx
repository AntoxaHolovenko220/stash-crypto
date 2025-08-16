import {
	Box,
	Button,
	CircularProgress,
	List,
	ListItem,
	Radio,
	Typography,
	Dialog,
	DialogContent,
	DialogActions,
	useMediaQuery,
} from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Client, getProfile, verifyDocuments } from '@/api/clientService'

const DocumentVerificationBlock = ({
	setProfile,
	setShowDocument,
}: {
	setProfile: (client: Client) => void
	setShowDocument: (value: boolean) => void
}) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const [selectedOption, setSelectedOption] = useState<'passport' | 'license'>(
		'passport'
	)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [isVerifying, setIsVerifying] = useState(false)
	const [dialogOpen, setDialogOpen] = useState(false)
	const [dialogText, setDialogText] = useState('')
	const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

	const handleContinue = () => {
		setIsSubmitted(true)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) return

		const fileArray = Array.from(files)
		if (
			(selectedOption === 'passport' && fileArray.length > 1) ||
			(selectedOption === 'license' && fileArray.length > 2)
		) {
			alert(
				selectedOption === 'passport' ? t('onlyOneFile') : t('onlyTwoFiles')
			)
			return
		}
		setSelectedFiles(fileArray)
	}

	const handleVerify = async () => {
		setIsVerifying(true)
		try {
			await verifyDocuments(selectedFiles)
			setIsSuccess(true)
			setDialogText(t('uploadSuccess'))
			setDialogOpen(true)
		} catch (error) {
			console.error('Upload failed:', error)
			setIsSuccess(false)
			setDialogText(t('uploadError'))
			setDialogOpen(true)
		} finally {
			setIsVerifying(false)
		}
	}

	return (
		<Box sx={{ maxWidth: '460px', width: '100%', boxSizing: 'border-box' }}>
			{!isMobile && (
				<Box
					sx={{
						width: '180px',
						height: '35px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F0F4FF',
						borderTopRightRadius: '16px',
						borderTopLeftRadius: '16px',
						boxSizing: 'border-box',
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
						{t('documents')}
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
					borderRadius: '16px',
					borderTopLeftRadius: !isMobile ? '0px' : '16px',
					backgroundColor: '#F0F4FF',
					boxSizing: 'border-box',
				}}
			>
				<Typography
					sx={{
						mt: '20px',
						fontFamily: 'Manrope',
						fontSize: '22px',
						fontWeight: 700,
						lineHeight: 1,
						textTransform: 'uppercase',
					}}
				>
					{t('verificateAccount')}
				</Typography>
				<Typography
					sx={{
						mt: '15px',
						fontFamily: 'Manrope',
						fontSize: '16px',
						fontWeight: 400,
						lineHeight: 1.3,
					}}
				>
					{t('toProtert')}
				</Typography>

				{!isSubmitted ? (
					<>
						<Typography
							sx={{
								mt: '40px',
								fontFamily: 'Manrope',
								fontSize: '16px',
								fontWeight: 700,
							}}
						>
							{t('selectType')}
						</Typography>

						<Box
							sx={{
								mt: '25px',
								display: 'flex',
								alignItems: 'center',
								gap: '13px',
							}}
						>
							<Radio
								checked={selectedOption === 'passport'}
								onChange={() => setSelectedOption('passport')}
							/>
							<Box component='img' src='/document-card.svg' />
							<Typography
								sx={{ width: '185px', fontFamily: 'Manrope', fontSize: '14px' }}
							>
								{t('uploadPassport')}
							</Typography>
						</Box>

						<Box
							sx={{
								mt: '25px',
								display: 'flex',
								alignItems: 'center',
								gap: '13px',
							}}
						>
							<Radio
								checked={selectedOption === 'license'}
								onChange={() => setSelectedOption('license')}
							/>
							<Box component='img' src='/document-card.svg' />
							<Typography
								sx={{ width: '246px', fontFamily: 'Manrope', fontSize: '14px' }}
							>
								{t('uploadLicence')}
							</Typography>
						</Box>

						<Button
							variant='contained'
							onClick={handleContinue}
							sx={{
								width: '100%',
								height: '56px',
								mt: '50px',
								border: '1px solid #232323',
								borderRadius: '6px',
								background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
								fontFamily: 'Manrope',
								fontSize: '19px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('continue')}
						</Button>
					</>
				) : (
					<Box sx={{ mt: '40px', fontSize: '20px', fontFamily: 'Manrope' }}>
						<Box
							sx={{
								p: '15px',
								backgroundColor: '#FFFFFF',
								borderRadius: '16px',
							}}
						>
							<Typography
								sx={{
									fontFamily: 'Manrope',
									fontSize: '16px',
									fontWeight: 700,
								}}
							>
								{t('makesure')}
							</Typography>
							<List>
								{Array.from({ length: 4 }, (_, i) => (
									<ListItem
										key={i + 1}
										sx={{
											p: '2px 8px',
											fontSize: '16px',
											fontFamily: 'Manrope',
										}}
									>
										– {t(`list${i + 1}`)}
									</ListItem>
								))}
							</List>
						</Box>

						<Box
							sx={{
								mt: '30px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
								<Box component='img' src='/document-card.svg' />
								<Typography
									sx={{
										fontFamily: 'Manrope',
										fontSize: '14px',
										width: selectedOption === 'passport' ? '185px' : '246px',
									}}
								>
									{selectedOption === 'passport'
										? t('uploadPassport')
										: t('uploadLicence')}
								</Typography>
							</Box>
							<label>
								<input
									type='file'
									hidden
									accept='image/*,.pdf'
									onChange={handleFileChange}
									multiple={selectedOption === 'license'}
								/>
								<Button
									component='span'
									sx={{
										width: '82px',
										height: '42px',
										border: '1px solid #232323',
										borderRadius: '6px',
										background: 'linear-gradient(180deg, #58A9FF, #0044FF)',
									}}
								>
									<UploadIcon
										sx={{ color: '#FFF', width: '30px', height: '30px' }}
									/>
								</Button>
							</label>
						</Box>

						<Button
							onClick={handleVerify}
							disabled={
								(selectedOption === 'passport' && selectedFiles.length !== 1) ||
								(selectedOption === 'license' && selectedFiles.length !== 2)
							}
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
						>
							{isVerifying ? (
								<CircularProgress size={24} sx={{ color: '#FFF' }} />
							) : (
								t('verify')
							)}
						</Button>
					</Box>
				)}

				<Box sx={{ mt: 'auto', display: 'flex', gap: '10px' }}>
					<InfoOutlinedIcon />
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '14px',
							color: '#414141',
							opacity: 0.5,
						}}
					>
						{t('dataprotected')}
					</Typography>
				</Box>
			</Box>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				PaperProps={{
					sx: {
						boxSizing: 'border-box',
						width: '390px',
						height: '263px',
						borderRadius: '24px',
						background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
						color: '#FFFFFF', // чтобы текст был читаемым
						padding: '20px 16px',
					},
				}}
			>
				<DialogContent
					sx={{
						p: '8px',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{isSuccess === true && (
						<CheckRoundedIcon
							sx={{
								width: '45px',
								height: '45px',
								borderRadius: '10px',
								background: 'linear-gradient(135deg, #0CAA0C, #60E260)',
							}}
						/>
					)}

					{isSuccess === false && (
						<CloseRoundedIcon
							sx={{
								width: '45px',
								height: '45px',
								borderRadius: '10px',
								background: 'linear-gradient(-45deg, #EF3030 0%, #980202 80%)',
							}}
						/>
					)}

					<Typography
						sx={{
							mt: '15px',
							fontFamily: 'Manrope',
							fontSize: '18px',
							color: '#FFFFFF',
							textAlign: 'center',
						}}
					>
						{dialogText}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={async () => {
							setDialogOpen(false)
							const updatedProfile = await getProfile()
							setProfile(updatedProfile)
							setShowDocument(false)
						}}
						sx={{
							width: '100%',
							height: '56px',
							border: '1px solid #232323',
							borderRadius: '6px',
							backgroundColor: '#FFFFFF',
							display: 'inline-block',
						}}
					>
						<Typography
							sx={{
								background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								fontFamily: 'Manrope',
								fontSize: '20px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('continue')}
						</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default DocumentVerificationBlock
