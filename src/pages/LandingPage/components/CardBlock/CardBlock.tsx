import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import Circle from '../Circle'
import { ModalProps } from '../../LandingPage'

const CardBlock = ({ setModalOpen }: ModalProps) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	const titleStyles = {
		fontFamily: 'Manrope',
		fontSize: isMobile ? '40px' : '64px',
		display: 'inline-block',
		lineHeight: 1,
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	}

	const featureBoxStyles = {
		minHeight: isMobile ? '46px' : '70px',
		px: isMobile ? '10px' : '20px',
		py: '5px',
		display: 'flex',
		alignItems: 'center',
		gap: isMobile ? '5px' : '10px',
		backgroundColor: '#FFFFFF',
		border: '1px solid #979797',
		borderRadius: '8px',
		boxSizing: 'border-box',
	}

	const iconStyles = {
		color: '#4a5568',
		width: isMobile ? '20px' : '30px',
		height: isMobile ? '20px' : '30px',
	}

	const features = [t('unique'), t('minimum'), t('maximum')]
	return (
		<Box
			sx={{
				height: 'calc(100vh - 80px)',
				py: '20px',
				px: isMobile ? '25px' : '50px',
				position: 'relative',
				overflow: 'hidden',
				boxSizing: 'border-box',
			}}
		>
			<Typography
				sx={{
					maxWidth: isMobile ? '300px' : '100%',
					width: '100%',
					background: 'linear-gradient(90deg, #3B3B3B, #B2B2B2)',
					...titleStyles,
				}}
			>
				{t('easy')}
			</Typography>
			<Typography
				sx={{
					background: 'linear-gradient(90deg, #0044FF, #98CEFF)',
					...titleStyles,
					fontWeight: 700,
					maxWidth: '850px',
				}}
			>
				{t('withdrawing')}
			</Typography>
			<Box
				sx={{
					mt: '20px',
					display: 'flex',
					flexWrap: 'wrap',
					gap: isMobile ? '10px' : '15px',
					maxWidth: '715px',
				}}
			>
				{features.map((text, index) => (
					<Box
						key={index}
						sx={{
							...featureBoxStyles,
							width: isMobile ? '247px' : index === 2 ? '100%' : '350px',
						}}
					>
						<CheckCircleIcon sx={iconStyles} />
						<Typography
							sx={{
								width: isMobile && index === 2 ? '140px' : '100%',
								fontFamily: 'Manrope',
								fontSize: isMobile ? '13px' : '16px',
								color: '#333333',
							}}
						>
							{text}
						</Typography>
					</Box>
				))}
			</Box>
			<Button
				variant='contained'
				disableElevation
				onClick={() => setModalOpen(true)}
				sx={{
					width: isMobile ? 'calc(100% - 50px)' : '352px',
					position: isMobile ? 'absolute' : 'relative',
					bottom: isMobile ? '65px' : '0px',
					height: '72px',
					mt: isMobile ? '0px' : '30px',
					border: '1px solid #414141',
					borderRadius: '8px',
					background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
					textTransform: 'none',
					fontFamily: 'Manrope',
					fontSize: '20px',
					fontWeight: 600,
					zIndex: 100,
				}}
			>
				{t('register now')}
			</Button>

			<Box
				component='img'
				src='/cards.svg'
				sx={{
					width: isMobile ? '105vw' : '683px',
					position: 'absolute',
					top: isMobile ? '315px' : '50px',
					right: isMobile ? '-45px' : '0px',
				}}
			/>
			<Circle
				size={480}
				color='linear-gradient(220deg, #006AFF, #80CEFF)'
				sx={{
					position: 'absolute',
					top: isMobile ? '493px' : '260px',
					right: isMobile ? '-250px' : '-180px',
					zIndex: -3,
				}}
			/>
			<Circle
				size={95}
				color='linear-gradient(90deg, #0A70FB, #76C4FB)'
				sx={{
					position: 'absolute',
					top: isMobile ? '380px' : '270px',
					right: isMobile ? '125px' : '535px',
					zIndex: -3,
				}}
			/>
		</Box>
	)
}

export default CardBlock
