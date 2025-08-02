import { Box, Typography, SxProps, Theme } from '@mui/material'

interface CardProps {
	sx?: SxProps<Theme>
}

const Card = ({ sx }: CardProps) => {
	return (
		<Box
			sx={{
				width: '518px',
				height: '292px',
				p: '15px',
				border: '1px solid #979797',
				borderRadius: '20px',
				backgroundColor: 'rgba(200, 200, 200, 0.3)',
				backdropFilter: 'blur(9px)',
				WebkitBackdropFilter: 'blur(9px)',
				...sx, // добавление пользовательских стилей
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box component='img' src='mastercard.svg' />
				<Typography
					sx={{
						ml: '15px',
						fontFamily: 'Montserrat',
						fontSize: '21px',
						color: '#232323',
					}}
				>
					Creditcard
				</Typography>
				<Box
					component='img'
					src='wifi.svg'
					sx={{ mt: '5px', ml: 'auto', mr: '20px' }}
				/>
			</Box>

			<Box sx={{ mt: '80px', ml: '5px' }}>
				<Typography
					sx={{ fontFamily: 'Montserrat', fontSize: '15px', color: '#232323' }}
				>
					Quinten Hiralal
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Montserrat',
						fontSize: '30px',
						fontWeight: 600,
						color: '#232323',
					}}
				>
					2817-9403-1784-5372
				</Typography>
			</Box>

			<Box sx={{ mt: '15px', ml: '5px' }}>
				<Typography
					sx={{ fontFamily: 'Montserrat', fontSize: '12px', color: '#232323' }}
				>
					Geldig tot
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Montserrat',
						fontSize: '19px',
						fontWeight: 600,
						color: '#232323',
					}}
				>
					12-2022
				</Typography>
			</Box>
		</Box>
	)
}

export default Card
