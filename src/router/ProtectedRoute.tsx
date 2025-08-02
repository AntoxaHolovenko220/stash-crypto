import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '@/api/authService'

interface ProtectedRouteProps {
	children: JSX.Element
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	return isAuthenticated() ? children : <Navigate to='/' replace />
}

export default ProtectedRoute
