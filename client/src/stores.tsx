import React from 'react'
import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { ColorScheme } from '@mantine/core'


export class Store {
    public ui: UIStore
    public server: ServerStore
    public timelapse: TimelapseStore

    constructor() {
        this.ui = new UIStore(this)
        this.server = new ServerStore(this)
        this.timelapse = new TimelapseStore(this)
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
        return { colorScheme: this.colorScheme, primaryColor: 'green' }
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

    host: string = 'http://localhost:8888'

    setHost(value: string) {
        this.host = value
    }

    constructor(public root: Store) {
        makeAutoObservable(this)
    }

}


export class TimelapseStore {

    paused: boolean = false
    index: number = 0
    captures: string[] = []

    setPaused(value: boolean) {
        this.paused = value
    }

    togglePlayback = () => {
        this.setPaused(!this.paused)
    }

    setIndex(value: number) {
        this.index = value
    }

    next() {
        if (this.paused) return
        this.index = this.index < this.captures.length - 1 ? this.index + 1 : 0
    }

    get currentImg() {
        return this.root.server.host + this.captures[this.index]
    }

    setCaptures(value: string[]) {
        this.captures = value
    }

    fetchCaptures = async () => {
        const capturesUrl = `${this.root.server.host}/captures`
        const response = await fetch(capturesUrl)
        const data = await response.json()
        this.setCaptures(data.captures)
    }


    constructor(public root: Store) {
        makeAutoObservable(this)
        this.fetchCaptures()
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