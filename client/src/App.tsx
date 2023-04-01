import packageJson from '../package.json'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'


import { Layout } from './Layout'
import { StoreProvider } from './stores'

import { ErrorPage } from './pages/ErrorPage'
import { Overview } from './pages/Overview'
import { Timeseries } from './pages/Timeseries'
import { Timelapse } from './pages/Timelapse'
import { Settings } from './pages/Settings'

export const appVersion = packageJson.version

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      {
        path: '/timeseries',
        element: <Timeseries />,
      },
      {
        path: '/timelapse',
        element: <Timelapse />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
])

export const App = () => {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  )
}