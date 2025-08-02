import { useEffect, useState } from 'react'
import {
	Box,
	IconButton,
	List,
	ListItem,
	Typography,
	useMediaQuery,
	Dialog,
	DialogActions,
	DialogTitle,
	Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { clearTokens, getUserData } from '@/api/authService'
import routes from '@/router/routes.json'

interface SidebarProps {
	isOpen: boolean
	onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const [activePath, setActivePath] = useState(location.pathname)
	const isWideScreen = useMediaQuery('(min-width:1280px)')
	const userData = getUserData()
	const [openLogoutModal, setOpenLogoutModal] = useState(false)

	useEffect(() => {
		setActivePath(location.pathname)
	}, [location.pathname])

	const navItems = [
		{ label: t('home'), path: routes.HomePage.path },
		{ label: t('transactions'), path: routes.TransactionsPage.path },
		{ label: t('profile'), path: routes.ProfilePage.path },
		// { label: t('customer support'), path: routes.CustomerSupportPage.path },
	]

	const adminNavItems = [
		{ label: t('clients'), path: routes.ClientsPage.path },
		{ label: t('transactions'), path: routes.AdminTransactionsPage.path },
	]

	const handleLogout = () => {
		clearTokens()
		navigate(routes.LandingPage.path)
	}

	return (
		<Box
			sx={{
				height: '100vh',
				width: '295px',
				backgroundColor: '#0C3E9C',
				position: isWideScreen ? 'relative' : 'fixed',
				left: isOpen ? 0 : '-345px',
				top: 0,
				transition: !isWideScreen ? 'left 0.3s ease' : 'none',
				zIndex: 1000,
				pt: '16px',
				pl: '50px',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Typography
					sx={{
						fontFamily: 'Benzin',
						fontSize: '20px',
						fontWeight: 700,
						lineHeight: '40px',
						color: '#FFFFFF',
					}}
				>
					Styx Cash
				</Typography>
				{!isWideScreen && (
					<IconButton
						onClick={onClose}
						sx={{
							mt: '3px',
							mr: '10px',
							color: 'white',
						}}
					>
						<CloseIcon />
					</IconButton>
				)}
			</Box>

			{userData?.roles?.includes('user') ? (
				<List
					sx={{
						mt: '70px',
						display: 'flex',
						flexDirection: 'column',
						gap: '30px',
						color: '#FFFFFF',
						fontFamily: 'Manrope',
						fontSize: '18px',
						lineHeight: 1,
					}}
				>
					{navItems.map(item => {
						const isActive = activePath === item.path

						return (
							<Box
								key={item.path}
								sx={{
									position: 'relative',
									'&:hover': {
										'& .nav-item': {
											borderTopRightRadius: !isActive ? '50px' : '0',
											borderBottomRightRadius: !isActive ? '50px' : '0',
											backgroundColor: !isActive
												? 'rgba(255, 255, 255, 0.1)'
												: '#FFFFFF',
										},
									},
								}}
							>
								<ListItem
									className='nav-item'
									onClick={() => {
										navigate(item.path)
										onClose()
									}}
									sx={{
										cursor: 'pointer',
										backgroundColor: isActive ? '#FFFFFF' : 'transparent',
										color: isActive ? '#0C3E9C' : '#FFFFFF',
										borderTopLeftRadius: '50px',
										borderBottomLeftRadius: '50px',

										px: '20px',
										py: '12px',
										position: 'relative',
										zIndex: 1,
									}}
								>
									{item.label}
								</ListItem>

								{isActive && (
									<>
										<Box
											sx={{
												position: 'absolute',
												right: '42px',
												top: '-62px',
												bottom: '0',
												width: '20px',
												border: 'none',
												backgroundColor: '#FFFFFF',
												transform: 'rotate(-90deg)',
												zIndex: 0,
											}}
										>
											<Box
												sx={{
													width: '100%',
													height: '100%',
													backgroundColor: '#0C3E9C',
													borderBottomLeftRadius: '50px',
												}}
											/>
										</Box>
										<Box
											sx={{
												position: 'absolute',
												right: '42px',
												top: '0',
												bottom: '-62px',
												width: '20px',
												backgroundColor: '#FFFFFF',
												transform: 'rotate(90deg)',
												zIndex: 0,
											}}
										>
											<Box
												sx={{
													width: '100%',
													height: '100%',
													backgroundColor: '#0C3E9C',
													borderTopLeftRadius: '50px',
												}}
											/>
										</Box>
									</>
								)}
							</Box>
						)
					})}
				</List>
			) : (
				<Box sx={{ mt: '40px' }}>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '18px',
							color: '#FFFFFF',
							opacity: 0.5,
						}}
					>
						{t('admin menu')}
					</Typography>
					<List
						sx={{
							mt: '10px',
							display: 'flex',
							flexDirection: 'column',
							gap: '30px',
							color: '#FFFFFF',
							fontFamily: 'Manrope',
							fontSize: '18px',
							lineHeight: 1,
						}}
					>
						{adminNavItems.map(item => {
							const isActive = activePath === item.path

							return (
								<Box
									key={item.path}
									sx={{
										position: 'relative',
										'&:hover': {
											'& .nav-item': {
												borderTopRightRadius: !isActive ? '50px' : '0',
												borderBottomRightRadius: !isActive ? '50px' : '0',
												backgroundColor: !isActive
													? 'rgba(255, 255, 255, 0.1)'
													: '#FFFFFF',
											},
										},
									}}
								>
									<ListItem
										className='nav-item'
										onClick={() => {
											navigate(item.path)
											onClose()
										}}
										sx={{
											cursor: 'pointer',
											backgroundColor: isActive ? '#FFFFFF' : 'transparent',
											color: isActive ? '#0C3E9C' : '#FFFFFF',
											borderTopLeftRadius: '50px',
											borderBottomLeftRadius: '50px',

											px: '20px',
											py: '12px',
											position: 'relative',
											zIndex: 1,
										}}
									>
										{item.label}
									</ListItem>

									{isActive && (
										<>
											<Box
												sx={{
													position: 'absolute',
													right: '42px',
													top: '-62px',
													bottom: '0',
													width: '20px',
													backgroundColor: '#FFFFFF',
													transform: 'rotate(-90deg)',
													zIndex: 0,
												}}
											>
												<Box
													sx={{
														width: '100%',
														height: '100%',
														backgroundColor: '#0C3E9C',
														borderBottomLeftRadius: '50px',
													}}
												/>
											</Box>
											<Box
												sx={{
													position: 'absolute',
													right: '42px',
													top: '0',
													bottom: '-62px',
													width: '20px',
													backgroundColor: '#FFFFFF',
													transform: 'rotate(90deg)',
													zIndex: 0,
												}}
											>
												<Box
													sx={{
														width: '100%',
														height: '100%',
														backgroundColor: '#0C3E9C',
														borderTopLeftRadius: '50px',
													}}
												/>
											</Box>
										</>
									)}
								</Box>
							)
						})}
					</List>
				</Box>
			)}
			<Box
				sx={{
					mt: '50px',
					width: 'fit-content',
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',
					gap: 1,
				}}
				onClick={() => setOpenLogoutModal(true)}
			>
				<LogoutRoundedIcon sx={{ color: '#FFFFFF' }} />
				<Typography
					sx={{
						fontFamily: 'Manrope',
						color: '#FFFFFF',
					}}
				>
					{t('logout')}
				</Typography>
			</Box>
			<Dialog
				open={openLogoutModal}
				onClose={() => setOpenLogoutModal(false)}
				PaperProps={{
					sx: {
						boxSizing: 'border-box',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						width: '390px',
						minHeight: '220px',
						borderRadius: '24px',
						background: 'linear-gradient(180deg, #58A9FF 0%, #0044FF 50%)',
						color: '#FFFFFF',
						padding: '20px 16px',
					},
				}}
			>
				<DialogTitle sx={{ p: 0 }}>
					<Typography
						sx={{
							fontFamily: 'Manrope',
							fontSize: '20px',
							fontWeight: 700,
							textAlign: 'center',
						}}
					>
						{t('want to logout')}
					</Typography>
				</DialogTitle>

				<DialogActions
					sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
				>
					<Button
						onClick={handleLogout}
						sx={{
							width: '100%',
							height: '56px',
							border: '1px solid #232323',
							borderRadius: '6px',
							display: 'inline-block',
							backgroundColor: '#D72828',
						}}
					>
						<Typography
							sx={{
								color: '#FFFFFF',
								fontFamily: 'Manrope',
								fontSize: '20px',
								fontWeight: 700,
								textTransform: 'none',
							}}
						>
							{t('logout')}
						</Typography>
					</Button>
					<Button
						onClick={() => setOpenLogoutModal(false)}
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
							{t('cancel')}
						</Typography>
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default Sidebar
