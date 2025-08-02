import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import routes from '@/router/routes.json'

const useRouteTitle = () => {
	const location = useLocation()

	useEffect(() => {
		const route = Object.values(routes).find(
			r =>
				r.path === location.pathname ||
				(r.path.includes(':') &&
					location.pathname.startsWith(r.path.split(':')[0]))
		)

		if (route?.title) {
			document.title = route.title
		}
	}, [location.pathname])
}

export default useRouteTitle
