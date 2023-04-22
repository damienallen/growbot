import React from 'react'
import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { ColorScheme } from '@mantine/core'


export const DEFAULT_HOST = 'localhost:4242'

export interface Capture {
    time: string
    brightness: number
    dark: boolean
    url: string
}

export class Store {
    public ui: UIStore
    public timelapse: TimelapseStore
    public server: ServerStore

    constructor() {
        this.ui = new UIStore(this)
        this.timelapse = new TimelapseStore(this)
        this.server = new ServerStore(this)
    }
}

export class UIStore {

    public colorScheme: ColorScheme = 'light'

    toggleColorScheme = () => {
        this.colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark'
        localforge.setItem('colorScheme', this.colorScheme)
    }

    setColorScheme = (value: ColorScheme) => {
        this.colorScheme = value
        localforge.setItem('colorScheme', this.colorScheme)
    }

    get theme() {
        return { colorScheme: this.colorScheme, primaryColor: 'green' }
    }

    loadSettings = () => {
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

    host: string = DEFAULT_HOST

    setHost = (value: string) => {
        this.host = value
        localforge.setItem('host', this.host)

        console.debug(`Using growbot host '${this.host}'`)
        this.root.timelapse.fetchCaptures()
    }

    get hostname() {
        return 'http://' + this.host
    }

    loadSettings = () => {
        localforge.getItem('host').then((value) => {
            this.setHost(value as string)
        })
    }

    constructor(public root: Store) {
        makeAutoObservable(this)
        this.loadSettings()
    }

}


export class TimelapseStore {

    paused: boolean = true
    index: number = 0
    captures: Capture[] = []

    speed: number = 1
    interval: number = 0
    windowSize: string = 'Day'

    setPaused = (value: boolean) => {
        this.paused = value
        this.updateInterval()
    }

    updateInterval = () => {
        clearInterval(this.interval)
        if (!this.paused) {
            const fps = 15 * this.speed
            this.interval = setInterval(this.next, 1000 / fps)
        }
    }

    setWindowSize = (value: string) => {
        this.windowSize = value
    }

    togglePlayback = () => {
        this.setPaused(!this.paused)
    }

    toggleSpeed = () => {
        if (this.speed < 2) {
            this.setSpeed(this.speed + 0.5)
        } else {
            this.setSpeed(0.5)
        }
        this.updateInterval()
    }

    setSpeed = (value: number) => {
        this.speed = value
    }

    setIndex = (value: number) => {
        this.index = value
    }

    next = () => {
        if (this.paused) return
        this.index = this.index < this.captures.length - 1 ? this.index + 1 : 0
    }

    setCaptures = (value: any[]) => {
        console.log(value)
        this.captures = value as Capture[]
    }


    get currentImg() {
        return this.captures[this.index].url
    }

    get currentTimestamp() {
        const capture = this.captures[this.index]
        if (capture?.url) {
            const segs = capture.url.split('/')
            return segs[segs.length - 1].replace('.jpg', '')
        }

        return ''
    }

    fetchCaptures = async () => {
        const capturesUrl = `${this.root.server.hostname}/captures`
        const response = await fetch(capturesUrl)
        const data = await response.json()
        this.setCaptures(data.captures)
        this.setPaused(false)
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