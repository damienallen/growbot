import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { Store } from './root'

export const DEFAULT_HOST = 'localhost:4242'

export class ServerStore {
    host: string = DEFAULT_HOST

    setHost = (value: string) => {
        this.host = value
        localforge.setItem('host', this.host)

        console.debug(`Using growbot host '${this.host}'`)
        this.root.timelapse.fetchCaptures()
        this.root.timelapse.fetchAvailable()
    }

    get hostname() {
        return 'http://' + this.host
    }

    loadSettings = () => {
        localforge.getItem('host').then((value) => {
            if (value) {
                this.setHost(value as string)
            } else {
                this.setHost(DEFAULT_HOST)
            }
        })
    }

    constructor(public root: Store) {
        makeAutoObservable(this)
        this.loadSettings()
    }
}
