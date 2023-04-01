

import { observer } from 'mobx-react'
import { MantineProvider, ColorSchemeProvider, createStyles } from '@mantine/core'
import { Outlet } from 'react-router-dom'

import { Nav } from './components/Nav'

import { useStores } from './stores'

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    height: '100vh'
  },
}))


export const Layout = observer(() => {
  const { classes } = useStyles()
  const { ui } = useStores()

  return (
    <ColorSchemeProvider colorScheme={ui.colorScheme} toggleColorScheme={ui.toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={ui.theme}>
        <div className={classes.container}>
          <Nav />
          <Outlet />
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  )
})