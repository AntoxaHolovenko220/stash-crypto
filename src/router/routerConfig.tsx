import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import routes from './routes.json'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '@/layouts/MainLayout'
import { Loader } from '@/components'

interface LayoutProps {
	children: React.ReactNode
}
const pages = import.meta.glob('../pages/**/[A-Z]*.tsx')
const lazyLoad = (componentName: string) => {
	const path = `../pages/${componentName}/${componentName}.tsx`
	const importer = pages[path]
	if (!importer) throw new Error(`Component not found: ${path}`)
	return lazy(importer as any)
}

const isLayoutRoute = (route: any): route is { layout: string } => {
	return 'layout' in route
}
const isPrivateRoute = (route: any): route is { private: boolean } => {
	return 'private' in route
}
export const generateRoutes = (): RouteObject[] => {
	return Object.values(routes).map(route => {
		const Component = lazyLoad(route.component)
		// Определяем Layout
		const Layout =
			isLayoutRoute(route) && route.layout === 'MainLayout'
				? MainLayout
				: ({ children }: LayoutProps) => <>{children}</>
		const element = (
			<Layout>
				<Suspense fallback={<Loader />}>
					{' '}
					<Component />
				</Suspense>{' '}
			</Layout>
		)
		return {
			path: route.path,
			element:
				isPrivateRoute(route) && route.private ? (
					<ProtectedRoute>{element}</ProtectedRoute>
				) : (
					element
				),
		}
	})
}
