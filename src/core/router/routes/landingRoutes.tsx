import type { RouteObject } from 'react-router-dom'
import { LandingLayout } from 'core/layouts'
import { HomePage, LandingFooter, LandingHeader } from 'modules/landing'
import { RouteTitle } from '../components/RouteTitle'

export const landingRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingLayout header={<LandingHeader />} footer={<LandingFooter />} />,
    children: [
      {
        index: true,
        element: (
          <RouteTitle>
            <HomePage />
          </RouteTitle>
        ),
      },
    ],
  },
]
