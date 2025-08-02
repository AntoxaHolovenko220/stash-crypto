import { Box, SxProps, Theme } from '@mui/material'

interface CircleProps {
	size?: number | string
	color?: string
	sx?: SxProps<Theme>
}

const Circle: React.FC<CircleProps> = ({
	size = 50,
	color = '#3AA2FF',
	sx = {},
}) => {
	const sizeValue = typeof size === 'number' ? `${size}px` : size

	return (
		<Box
			sx={{
				width: sizeValue,
				height: sizeValue,
				borderRadius: '50%',
				background: color,
				...sx,
			}}
		/>
	)
}

export default Circle
