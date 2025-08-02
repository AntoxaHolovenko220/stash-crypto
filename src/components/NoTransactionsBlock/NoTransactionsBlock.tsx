import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const NoTransactionsBlock = () => {
	const { t } = useTranslation()

	return (
		<Typography
			sx={{
				mt: '30px',
				fontFamily: 'Manrope',
				fontSize: '20px',
				fontWeight: 500,
				textAlign: 'center',
			}}
		>
			{t('no transactions')}
		</Typography>
	)
}

export default NoTransactionsBlock
