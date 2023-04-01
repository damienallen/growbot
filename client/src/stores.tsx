import React from 'react'
import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { ColorScheme } from '@mantine/core'


export class Store {
    public ui: UIStore
    public server: ServerStore

    constructor() {
        this.ui = new UIStore(this)
        this.server = new ServerStore(this)
    }
}

export class UIStore {

    public colorScheme: ColorScheme = 'light'

    toggleColorScheme() {
        this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark'
        localforge.setItem('colorScheme', this.colorScheme)
    }

    setColorScheme(value: ColorScheme) {
        this.colorScheme = value
        localforge.setItem('colorScheme', this.colorScheme)
    }

    get theme() {
        return { colorScheme: this.colorScheme }
    }

    loadSettings() {
        localforge.getItem('colorScheme').then((value) => {
            this.setColorScheme(value as ColorScheme)
        })
    }

    constructor(public root: Store) {
        makeAutoObservable(this, {}, { autoBind: true })
        this.loadSettings()
    }
}

export class ServerStore {

    host: string = 'localhost'

    setHost(value: string) {
        this.host = value
    }

    constructor(public root: Store) {
        makeAutoObservable(this)
    }

}


// Store helpers
export const store = new Store()
const StoreContext = React.createContext(store)

export const StoreProvider = ({ children }: { children: any }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

// Hook to use store in functional components
export const useStores = () => React.useContext(StoreContext)