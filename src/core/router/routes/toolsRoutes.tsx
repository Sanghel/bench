import type { RouteObject } from 'react-router-dom'
import { LandingLayout } from 'core/layouts'
import { LandingFooter, LandingHeader } from 'modules/landing'
import { ToolsHomePage } from 'modules/tools'
import { RouteTitle } from '../components/RouteTitle'
import { TOOLS_HOME } from '../routes.config'

/** Phase 1: every tools URL lands on the placeholder. Phase 2 swaps in the dashboard shell. */
export const toolsRoutes: RouteObject[] = [
  {
    path: TOOLS_HOME,
    element: <LandingLayout header={<LandingHeader />} footer={<LandingFooter />} />,
    children: [
      {
        index: true,
        element: (
          <RouteTitle title="Tools">
            <ToolsHomePage />
          </RouteTitle>
        ),
      },
      {
        path: ':toolId',
        element: (
          <RouteTitle title="Tools">
            <ToolsHomePage />
          </RouteTitle>
        ),
      },
    ],
  },
]
