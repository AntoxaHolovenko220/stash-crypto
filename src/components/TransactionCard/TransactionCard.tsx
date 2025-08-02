import { Box, Typography, useMediaQuery, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import EditTransactionModal from '../EditTransactionModal'
import { Dispatch, SetStateAction, useState } from 'react'
import { TransactionData } from '@/api/transactionService'
import AnimatedLoaderIcon from '../AnimatedLoaderIcon'
import { WalletModal, WireTransferModal, ZelleModal } from './components'

export type TransactionType = 'deposit' | 'withdrawal'
export type TransactionStatus = 'completed' | 'canceled' | 'pending'
export type PaymentMethod =
	| 'zelleTransfer'
	| 'paypalAddress'
	| 'wireTransfer'
	| 'walletBTCAddress'

interface PaymentMethodConfig {
	icon: string
	label?: string
}

export interface TransactionCardProps {
	id: string
	transactionId: string
	date: string
	status: TransactionStatus
	type: TransactionType
	paymentMethod: PaymentMethod
	amount: string
	balance: string
	paymentDetails: object
	wallet?: string
	setTransactions?: Dispatch<SetStateAction<TransactionData[]>>
	showEdit?: boolean
}

const TransactionCard = ({
	id,
	transactionId,
	date,
	status,
	type,
	paymentMethod,
	paymentDetails,
	amount,
	balance,
	wallet,
	setTransactions,
	showEdit,
}: TransactionCardProps) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [walletModalOpen, setWalletModalOpen] = useState(false)
	const [zelleModalOpen, setZelleModalOpen] = useState(false)
	const [wireTransferModalOpen, setWireTransferModalOpen] = useState(false)

	const statusConfig = {
		completed: { color: '#52BC37', icon: '/completed.svg' },
		canceled: { color: '#D72828', icon: '/canceled.svg' },
		pending: { color: '#F4D800' },
	}

	const paymentMethodConfig: Record<PaymentMethod, PaymentMethodConfig> = {
		paypalAddress: { icon: '/paypal.svg' },
		zelleTransfer: { icon: '/zelle.svg' },
		wireTransfer: { icon: '/wire-transfer.svg', label: 'Wire transfer' },
		walletBTCAddress: {
			icon: '/wallet.svg',
			label: type === 'deposit' ? 'From wallet' : 'To wallet',
		},
	}

	const commonStyles = {
		fontFamily: 'Manrope',
		fontSize: '16px',
		lineHeight: 1,
	}

	const currentPaymentMethod = paymentMethodConfig[paymentMethod]

	const formattedDate = new Intl.DateTimeFormat('uk-UA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	})
		.format(new Date(date))
		.replace(',', '')

	return (
		<Box
			sx={{
				width: '100%',
				minHeight: '98px',
				boxSizing: 'border-box',
				backgroundColor: '#F7F9FF',
				borderRadius: isMobile ? '6px' : 0,
				p: '25px 15px',
				position: 'relative',
			}}
		>
			{showEdit && (
				<IconButton
					sx={{ position: 'absolute', top: '10px', right: '10px' }}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					<EditIcon sx={{ width: '19px', height: '19px', color: '#0246FF' }} />
				</IconButton>
			)}
			<Box
				sx={{
					width: 'fit-content',
					p: '5px 9px',
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
					bgcolor: '#BDCAF0',
					borderRadius: '4px',
					mb: '20px',
				}}
			>
				<Box
					component='img'
					src='/transaction-arrow.svg'
					sx={{
						transform: type === 'deposit' ? 'rotate(0deg)' : 'rotate(180deg)',
					}}
				/>
				<Typography sx={{ ...commonStyles, fontWeight: 500, color: '#FFFFFF' }}>
					{type === 'deposit' ? t('top-up') : t('withdrawal')}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
					<Box component='img' src={currentPaymentMethod.icon} />
					{currentPaymentMethod.label && (
						<Typography
							sx={{ ...commonStyles, fontWeight: 500, color: '#FFFFFF' }}
						>
							{currentPaymentMethod.label}
						</Typography>
					)}
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					'@media (max-width:900px)': {
						flexDirection: 'column',
						alignItems: 'center',
						gap: '20px',
					},
				}}
			>
				{[
					{ label: t('id transaction'), value: transactionId },
					{ label: t('date'), value: formattedDate },
					{
						label: t('status'),
						value: (
							<Box
								sx={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}
							>
								<Typography
									sx={{
										...commonStyles,
										fontWeight: 600,
										color: statusConfig[status].color,
									}}
								>
									{status === 'completed'
										? 'Completed'
										: status === 'canceled'
										? 'Canceled'
										: 'Pending'}
								</Typography>
								{status === 'pending' ? (
									<AnimatedLoaderIcon />
								) : (
									<Box component='img' src={statusConfig[status].icon} />
								)}
							</Box>
						),
					},
					{
						label: t('type'),
						value: (
							<Typography
								sx={{
									...commonStyles,
									fontWeight: 600,
									color: type === 'deposit' ? '#52BC37' : '#000000',
								}}
							>
								{type === 'deposit' ? 'Deposit' : 'Withdrawal'}
							</Typography>
						),
					},
					{
						value: (
							<Box
								sx={{
									display: isMobile ? 'flex' : 'block',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Box
									sx={{
										height: '21px',
										display: 'flex',
										alignItems: 'center',
										gap: '5px',
									}}
								>
									<Box component='img' src={currentPaymentMethod.icon} />
									{currentPaymentMethod.label && (
										<Typography
											sx={{
												...commonStyles,
												fontWeight: 600,
												whiteSpace: 'nowrap',
											}}
										>
											{currentPaymentMethod.label}
										</Typography>
									)}
								</Box>

								<Box
									onClick={() => {
										if (
											paymentMethod === 'walletBTCAddress' ||
											paymentMethod === 'paypalAddress'
										)
											setWalletModalOpen(true)
										else if (paymentMethod === 'wireTransfer')
											setWireTransferModalOpen(true)
										else if (paymentMethod === 'zelleTransfer')
											setZelleModalOpen(true)
									}}
									sx={{
										mt: '15px',
										display: 'flex',
										gap: '5px',
										cursor: 'pointer',
									}}
								>
									<Typography
										sx={{
											...commonStyles,
											fontWeight: 400,
											'@media (max-width:900px)': {
												mt: '0px',
											},
										}}
									>
										{wallet
											? `${wallet.slice(0, 4)}...${wallet.slice(-6)}`
											: 'Details'}
									</Typography>
									<SearchIcon
										sx={{
											width: '21px',
											height: '21px',
											mt: '-2px',
											color: '#0246FF',
										}}
									/>
								</Box>
							</Box>
						),
					},
					{ label: t('amount'), value: amount },
					{ label: t('yourbalance'), value: balance },
				].map((item, index) => (
					<Box
						key={index}
						sx={{
							maxWidth:
								index === 0
									? '117px'
									: index === 1
									? '128px'
									: index === 2
									? '108px'
									: index === 3
									? '90px'
									: index === 4
									? '128px'
									: index === 5
									? '85px'
									: '105px',
							width: '100%',
							'@media (max-width:900px)': {
								maxWidth: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							},
						}}
					>
						{item.label && (
							<Box
								sx={{
									height: '21px',
									display: 'flex',
									alignItems: 'center',
									mb: '15px',
									'@media (max-width:900px)': {
										mb: '0px',
									},
								}}
							>
								<Typography
									sx={{
										...commonStyles,
										fontWeight: 600,
									}}
								>
									{item.label}:
								</Typography>
							</Box>
						)}
						<Box
							sx={{
								...commonStyles,
								fontWeight: 400,
								width: !item.label ? '100%' : 'fit-content',
							}}
						>
							{item.label === t('amount')
								? Number(item.value).toFixed(2)
								: item.label === t('yourbalance')
								? Number(item.value).toFixed(2)
								: item.value}
						</Box>
					</Box>
				))}
			</Box>
			{showEdit && (
				<EditTransactionModal
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					setClose={setIsModalOpen}
					id={id!}
					setTransactions={setTransactions}
				/>
			)}
			{paymentDetails && (
				<>
					<WalletModal
						open={walletModalOpen}
						onClose={() => setWalletModalOpen(false)}
						value={paymentDetails}
						name={paymentMethod}
					/>
					<WireTransferModal
						open={wireTransferModalOpen}
						onClose={() => setWireTransferModalOpen(false)}
						values={paymentDetails}
					/>
					<ZelleModal
						open={zelleModalOpen}
						onClose={() => setZelleModalOpen(false)}
						values={paymentDetails}
					/>
				</>
			)}
		</Box>
	)
}

export default TransactionCard
