

import { Provider } from 'mobx-react'
import { MantineProvider } from '@mantine/core'
import { Store } from './stores'

export const App = () => {
  const store = new Store()

  return (
    <Provider store={store} settings={store.settings}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={store.ui.theme}>
        Hello growbot
      </MantineProvider>
    </Provider>
  )
}