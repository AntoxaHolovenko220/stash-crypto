import { Box, Typography, SxProps, Theme } from '@mui/material'
import LabelIcon from '@mui/icons-material/Label'
import { useTranslation } from 'react-i18next'

interface VerificationProps {
	status: string
	sx?: SxProps<Theme>
}

const VerificationBlock = ({
	status = 'unverified',
	sx,
}: VerificationProps) => {
	const { t } = useTranslation()
	return (
		<Box
			sx={{
				width: '192px',
				height: '38px',
				px: '8px',
				border: '1px solid',
				borderRadius: '10px',
				boxSizing: 'border-box',
				backgroundColor: '#FFFFFF',
				borderColor:
					status === 'verified'
						? '#52BC37'
						: status === 'pending'
						? '#F4D800'
						: '#D72828',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '8px',
				...sx,
			}}
		>
			<Typography
				sx={{
					fontFamily: 'Manrope',
					fontSize: '15px',
					lineHeight: 1.3,
					color:
						status === 'verified'
							? '#52BC37'
							: status === 'pending'
							? '#F4D800'
							: '#D72828',
				}}
			>
				{status === 'verified'
					? t('verified')
					: status === 'pending'
					? t('pending')
					: t('no-verified')}
			</Typography>
			<LabelIcon
				sx={{
					color:
						status === 'verified'
							? '#52BC37'
							: status === 'pending'
							? '#F4D800'
							: '#D72828',
					transform: 'rotate(90deg)',
				}}
			/>
		</Box>
	)
}

export default VerificationBlock
