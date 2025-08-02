interface BaseRoute {
	path: string
	component: string
	title: string
}

interface LayoutRoute extends BaseRoute {
	layout: string
}

interface PrivateRoute extends LayoutRoute {
	private: true
}

type RouteConfig = BaseRoute | LayoutRoute | PrivateRoute

declare module '@/router/routes.json' {
	const routes: Record<string, RouteConfig>
	export default routes
}
