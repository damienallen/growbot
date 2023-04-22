import { makeAutoObservable } from 'mobx'
import { Store } from './root'
import { DateValue } from '@mantine/dates'



export interface Capture {
    time: string
    brightness: number
    dark: boolean
    url: string
}

export class TimelapseStore {

    paused: boolean = true
    index: number = 0
    captures: Capture[] = []

    speed: number = 1
    interval: number = 0
    windowSize: string = 'Day'

    startDate: DateValue = null
    stopDate: DateValue = null

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

    setStartDate = (value: DateValue) => {
        this.startDate = value
    }

    setStopDate = (value: DateValue) => {
        this.stopDate = value
    }

    get dateRange(): [DateValue, DateValue] {
        return [this.startDate, this.stopDate]
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
        this.captures = value as Capture[]
    }


    get currentImg() {
        return this.captures[this.index] ? this.captures[this.index].url : ''
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
        const capturesUrl = `${this.root.server.hostname}/captures/`
        const response = await fetch(capturesUrl)
        const data = await response.json()
        this.setCaptures(data.captures)
        this.setPaused(false)
    }


    constructor(public root: Store) {
        makeAutoObservable(this)
    }

}
