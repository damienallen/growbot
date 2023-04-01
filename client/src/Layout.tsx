

import { observer } from 'mobx-react'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { Nav } from './components/Nav'

import { useStores } from './stores'
import packageJson from '../package.json'

export const appVersion = packageJson.version

export const Layout = observer(() => {
  const { ui } = useStores()
  return (
    <ColorSchemeProvider colorScheme={ui.colorScheme} toggleColorScheme={ui.toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={ui.theme}>
        <Nav />
      </MantineProvider>
    </ColorSchemeProvider>
  )
})