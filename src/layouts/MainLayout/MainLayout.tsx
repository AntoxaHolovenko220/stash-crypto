import { ReactNode, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Footer, Header, Sidebar } from '@/layouts'
import { Box, useMediaQuery } from '@mui/material'
import { SupportButtonModal } from '@/components'
import routes from '@/router/routes.json'

interface MainLayoutProps {
	children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const location = useLocation()
	const isWideScreen = useMediaQuery('(min-width:1280px)')

	useEffect(() => {
		setIsSidebarOpen(isWideScreen)
	}, [isWideScreen])

	const toggleSidebar = () => {
		if (!isWideScreen) {
			setIsSidebarOpen(!isSidebarOpen)
		}
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isWideScreen ? 'row' : 'column',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			{isWideScreen && (
				<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
			)}
			{!isWideScreen && <Header onLogoClick={toggleSidebar} />}
			<Box
				sx={{
					display: 'flex',
					flexDirection: !isWideScreen ? 'row' : 'column',
					flex: 1,
					overflow: 'hidden',
				}}
			>
				{isWideScreen && <Header onLogoClick={toggleSidebar} />}
				{!isWideScreen && (
					<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
				)}
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						position: 'relative',
						p: '20px',
						backgroundImage: 'url(/lines.png)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
					}}
					key={location.pathname}
				>
					{children}
					<SupportButtonModal />
				</Box>
				{/* {isWideScreen && location.pathname === routes.ProfilePage.path && (
					<Footer />
				)} */}
			</Box>
			{/* {!isWideScreen && location.pathname === routes.ProfilePage.path && (
				<Footer />
			)} */}
		</Box>
	)
}

export default MainLayout
