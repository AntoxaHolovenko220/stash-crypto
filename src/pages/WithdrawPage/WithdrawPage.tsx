import { Box, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import FirstStep from './components/FirstStep/FirstStep'
import { useState } from 'react'
import SecondStep from './components/SecondStep/SecondStep'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

const WithdrawPage = () => {
	const { t } = useTranslation()

	const [method, setMethod] = useState<
		'paypalAddress' | 'wireTransfer' | 'walletBTCAddress'
	>('paypalAddress')
	const [checkForm, setCheckFrom] = useState(false)

	return (
		<Box>
			{!checkForm ? (
				<FirstStep
					selectedOption={method}
					setSelectedOption={setMethod}
					setCheckForm={setCheckFrom}
				/>
			) : (
				<>
					<IconButton
						sx={{ position: 'absolute', top: '46px', left: '12px' }}
						onClick={() => setCheckFrom(false)}
					>
						<KeyboardBackspaceIcon
							sx={{
								color: '#000000',
							}}
						/>
					</IconButton>
					<SecondStep method={method} setCheckForm={setCheckFrom} />
				</>
			)}
		</Box>
	)
}

export default WithdrawPage
