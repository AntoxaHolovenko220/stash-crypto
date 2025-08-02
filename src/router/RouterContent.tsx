import { Routes, Route } from 'react-router-dom'
import { generateRoutes } from './routerConfig'
import useRouteTitle from '@/hooks/useRouteTitle'

const RouterContent = () => {
	useRouteTitle()

	return (
		<Routes>
			{generateRoutes().map((route, index) => (
				<Route key={index} path={route.path} element={route.element} />
			))}
		</Routes>
	)
}

export default RouterContent
