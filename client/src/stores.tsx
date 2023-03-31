import { makeAutoObservable } from 'mobx'
import Cookies from 'universal-cookie'


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

    theme: any = { colorScheme: 'dark' }

    constructor(public root: Store) {
        makeAutoObservable(this)
    }

    setHost(value: any) {
        this.theme = value
    }

}

export class ServerStore {

    host: string = ''

    constructor(public root: Store) {
        makeAutoObservable(this)
    }

    setHost(value: string) {
        this.host = value
    }

}