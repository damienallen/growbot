

import packageJson from '../package.json'
import { Layout } from './Layout'
import { StoreProvider } from './stores'

export const appVersion = packageJson.version

export const App = () => {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  )
}