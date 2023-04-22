import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { ColorScheme } from '@mantine/core'
import { Store } from './root'




export class UIStore {

    public colorScheme: ColorScheme = 'dark'

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

