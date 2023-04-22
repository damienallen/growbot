import { makeAutoObservable } from 'mobx'
import localforge from 'localforage'
import { Store } from './root'
import { DateValue } from '@mantine/dates'
import dayjs from 'dayjs'

const getDay = (date: Date) => {
    const day = date.getDay()
    return day === 0 ? 6 : day - 1
}

export const startOfWeek = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - getDay(date) - 1)
}

export const endOfWeek = (date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + (6 - getDay(date))))
        .endOf('date')
        .toDate()
}

export const startOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export const endOfMonth = (date: Date) => {
    return dayjs(new Date(date.getFullYear(), date.getMonth(), dayjs(date).daysInMonth()))
        .endOf('date')
        .toDate()
}


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
    captureDates: string[] = []

    speed: number = 1
    interval: number = 0
    windowSize: string = 'Day'

    startDate: DateValue = new Date()
    stopDate: DateValue = new Date()

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

    setWindowSize = (value: string, update: boolean = true) => {
        this.windowSize = value
        localforge.setItem('windowSize', this.windowSize)

        if (update) {
            switch (value) {
                case 'Day':
                    if (this.startDate) {
                        this.setStartDate(dayjs(this.startDate).startOf('day').toDate())
                        this.setStopDate(dayjs(this.startDate).endOf('day').toDate())
                    }
                    break
                case 'Week':
                    if (this.startDate) {
                        const start = dayjs(startOfWeek(this.startDate)).add(1, 'day').toDate()
                        const stop = endOfWeek(this.startDate)
                        this.setStartDate(start)
                        this.setStopDate(stop)
                    }
                    break
                case 'Month':
                    if (this.startDate) {
                        const start = startOfMonth(this.startDate)
                        const stop = endOfMonth(this.startDate)
                        this.setStartDate(start)
                        this.setStopDate(stop)
                    }
                    break
                default:
                    break
            }
        }
    }

    setStartDate = (value: DateValue) => {
        this.startDate = value
        console.debug('Start:', value)
        localforge.setItem('startDate', this.startDate)

        this.fetchCaptures()
    }

    setStopDate = (value: DateValue) => {
        this.stopDate = value
        console.debug('Stop: ', value)
        localforge.setItem('stopDate', this.stopDate)
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
        console.log(value)
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

    setCaptureDates(value: string[]) {
        this.captureDates = value.map((date: string) => (dayjs(date).startOf('day').format()))
    }

    fetchCaptures = async () => {
        if (this.startDate && this.stopDate) {
            const startTime = this.startDate.toISOString()
            const stopTime = this.stopDate.toISOString()
            const queryParams = `?start=${startTime}&stop=${stopTime}`
            const capturesUrl = `${this.root.server.hostname}/captures/${queryParams}`

            const response = await fetch(capturesUrl)
            const data = await response.json()
            this.setCaptures(data.captures)
            this.setPaused(false)
        } else {
            this.setCaptures([])
            this.setPaused(false)
        }
    }

    fetchAvailable = async () => {
        const availableUrl = `${this.root.server.hostname}/captures/available/`
        const response = await fetch(availableUrl)
        const data = await response.json()
        this.setCaptureDates(data.dates)
    }


    loadSettings = () => {
        localforge.getItem('windowSize').then((value) => {
            if (value) {
                this.setWindowSize(value as string, false)
            } else {
                this.setWindowSize('Day', false)
            }
        })

        localforge.getItem('startDate').then((value) => {
            if (value) {
                this.setStartDate(new Date(value as string))
            }
        })

        localforge.getItem('stopDate').then((value) => {
            if (value) {
                this.setStopDate(new Date(value as string))
            }
        })
    }


    constructor(public root: Store) {
        makeAutoObservable(this)
        this.loadSettings()
    }

}
