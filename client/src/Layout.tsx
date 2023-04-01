

import { observer } from 'mobx-react'
import { MantineProvider, ColorSchemeProvider } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import { Nav } from './components/Nav'

import { useStores } from './stores'



export const Layout = observer(() => {
  const { ui } = useStores()
  return (
    <ColorSchemeProvider colorScheme={ui.colorScheme} toggleColorScheme={ui.toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={ui.theme}>
        <Nav />
        <Outlet />
      </MantineProvider>
    </ColorSchemeProvider>
  )
})