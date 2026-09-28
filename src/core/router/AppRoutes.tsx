import { useMemo } from 'react'
import type { JSX } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { landingRoutes } from './routes/landingRoutes'
import { toolsRoutes } from './routes/toolsRoutes'
import { HOME } from './routes.config'

const notFoundRoute: RouteObject = {
  path: '*',
  element: <Navigate to={HOME} replace />,
}

export function AppRoutes(): JSX.Element | null {
  const routes = useMemo((): RouteObject[] => [...landingRoutes, ...toolsRoutes, notFoundRoute], [])
  return useRoutes(routes)
}
