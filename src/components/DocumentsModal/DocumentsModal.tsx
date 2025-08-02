import {
	Dialog,
	DialogContent,
	Typography,
	DialogTitle,
	useMediaQuery,
	ListItem,
	List,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

export interface DocumentInterface {
	title?: string
	desc: DocumentData[]
}

interface DocumentData {
	type: string
	values?: string[]
}

interface ModalProps {
	open: boolean
	onClose: () => void
	data: DocumentInterface
}

const DocumentsModal = ({ open, onClose, data }: ModalProps) => {
	const { t } = useTranslation()

	const isMobile = useMediaQuery('(max-width:480px)')

	return (
		<Dialog
			open={open}
			onClose={onClose}
			PaperProps={{
				sx: {
					m: '40px 20px',
					boxSizing: 'border-box',
					width: '600px',
					minHeight: '263px',
					borderRadius: '24px',
				},
			}}
			sx={{ my: '20px' }}
		>
			<DialogTitle sx={{ p: 0, pt: '10px' }}>
				<Typography
					sx={{
						fontFamily: 'Manrope',
						fontSize: '20px',
						fontWeight: 700,
						textAlign: 'center',
					}}
				>
					{data.title}
				</Typography>
			</DialogTitle>
			<DialogContent
				sx={{
					mt: '20px',
					mb: '8px',
					p: '8px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{data.desc.map((block, blockIndex) => {
					if (block.type === 'text') {
						return block.values?.map((value, valueIndex) => (
							<Typography
								key={`text-${blockIndex}-${valueIndex}`}
								sx={{
									fontFamily: 'Manrope',
									fontSize: isMobile ? '14px' : '16px',
									fontWeight: 400,
									textAlign: 'left',
									width: '100%',
									// mb: '8px',
								}}
							>
								{value}
							</Typography>
						))
					}
					if (block.type === 'list') {
						return (
							<List sx={{ pb: 0 }}>
								{block.values?.map((value, valueIndex) => (
									<ListItem
										key={`text-${blockIndex}-${valueIndex}`}
										sx={{
											pt: '0px',
											fontFamily: 'Manrope',
											fontSize: isMobile ? '14px' : '16px',
											fontWeight: 400,
											textAlign: 'left',
											width: '100%',
										}}
									>
										{value}
									</ListItem>
								))}
							</List>
						)
					}
					if (block.type === 'br') {
						return <br key={`br-${blockIndex}`} />
					}
					return null
				})}
			</DialogContent>
		</Dialog>
	)
}

export default DocumentsModal
