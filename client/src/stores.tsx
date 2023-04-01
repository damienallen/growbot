import React from 'react'
import { makeAutoObservable } from 'mobx'
import Cookies from 'universal-cookie'
import { ColorScheme } from '@mantine/core'


export class Store {
    public ui: UIStore
    public server: ServerStore
    public settings: Cookies

    constructor() {
        this.ui = new UIStore(this)
        this.server = new ServerStore(this)
        this.settings = new Cookies()
    }
}

export class UIStore {

    public colorScheme: ColorScheme = 'dark'

    constructor(public root: Store) {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    toggleColorScheme() {
        this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark'
        console.log(this.colorScheme)
    }

    get theme() {
        return { colorScheme: this.colorScheme }
    }

}

export class ServerStore {

    host: string = 'localhost'

    constructor(public root: Store) {
        makeAutoObservable(this)
    }

    setHost(value: string) {
        this.host = value
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