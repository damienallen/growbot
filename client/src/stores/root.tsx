import React from 'react'
import { UIStore } from './UIStore'
import { TimelapseStore } from './TimelapseStore'
import { ServerStore } from './ServerStore'



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



// Store helpers
export const store = new Store()
const StoreContext = React.createContext(store)

export const StoreProvider = ({ children }: { children: any }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

// Hook to use store in functional components
export const useStores = () => React.useContext(StoreContext)