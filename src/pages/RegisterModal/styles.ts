export const dialogStyles = {
	PaperProps: { sx: { borderRadius: '20px' } },
}

export const closeButtonStyles = {
	position: 'absolute',
	top: '5px',
	right: '5px',
}

export const textFieldStyles = {
	'& .MuiInput-root': {
		'&:before': {
			borderBottomColor: '#E0E0E0',
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottomColor: '#BDBDBD',
		},
	},
	'& .MuiInput-input': {
		fontFamily: 'Manrope',
	},
	'& .Mui-error': {
		'& .MuiInput-root': {
			'&:before': {
				borderBottomColor: '#DE0000',
			},
			'&:after': {
				borderBottomColor: '#DE0000',
			},
			'&:hover:not(.Mui-disabled):before': {
				borderBottomColor: '#DE0000',
			},
		},
	},
}

export const agreementTextStyles = {
	mb: '5px',
	fontSize: '12px',
	fontFamily: 'Manrope',
	color: '#0C0C0C90',
}

export const linkStyles = {
	fontWeight: 500,
	color: '#0044FF',
}

export const primaryButtonStyles = {
	height: '56px',
	mt: '20px',
	border: '1px solid #414141',
	borderRadius: '6px',
	background: 'linear-gradient(90deg, #58A9FF, #0044FF)',
	fontFamily: 'Manrope',
	fontSize: '22px',
	fontWeight: 500,
	textTransform: 'none',
	'&:disabled': {
		background: '#E0E0E0',
	},
}

export const secondaryButtonStyles = {
	height: '56px',
	mt: '10px',
	border: '1px solid #414141',
	borderRadius: '6px',
	fontFamily: 'Manrope',
	fontSize: '22px',
	fontWeight: 500,
	textTransform: 'none',
	color: '#333333',
}

export const footerTextStyles = {
	width: '100%',
	mt: '20px',
	fontFamily: 'Manrope',
	fontSize: '12px',
	fontWeight: 300,
	color: '#0C0C0C90',
}
