import { observer } from 'mobx-react'
import { Slider, createStyles, rem } from '@mantine/core'

import { useStores } from '../stores/root'
import { useEffect, useState } from 'react'

const useStyles = createStyles((theme) => ({
    track: {
        '&:before': {
            backgroundColor: theme.colors.gray[2],
            opacity: 0.5,
        },
    },
    bar: {
        backgroundColor: theme.white,
        opacity: 0.75,
    },
    mark: {
        width: rem(6),
        height: rem(6),
        borderRadius: rem(6),
        transform: `translateX(-${rem(3)}) translateY(-${rem(2)})`,
        borderColor: theme.colors.gray[2],
        opacity: 0.75,
    },
    markFilled: {
        borderColor: theme.white,
        opacity: 1,
    },
    markLabel: {
        fontSize: theme.fontSizes.xs,
        marginTop: rem(-32),
        color: theme.white,
    },
    thumb: {
        height: rem(8),
        width: rem(8),
        backgroundColor: theme.white,
        borderWidth: 0,
        boxShadow: theme.shadows.sm,
    },
}))

export const ProgressSlider = observer(() => {
    const { classes } = useStyles()
    const { timelapse } = useStores()

    const [sliderValue, setSliderValue] = useState(0)

    useEffect(() => {
        setSliderValue(timelapse.index)
    }, [timelapse.index])

    const marks = false
        ? [
              { value: 25, label: '06:00' },
              { value: 50, label: '12:00' },
              { value: 75, label: '18:00' },
          ]
        : undefined

    return (
        <Slider
            onChange={(ind: number) => {
                timelapse.setIndex(ind)
                timelapse.setPaused(true)
            }}
            value={sliderValue}
            max={timelapse.captures.length}
            marks={marks}
            size={3}
            classNames={{
                track: classes.track,
                bar: classes.bar,
                mark: classes.mark,
                markFilled: classes.markFilled,
                markLabel: classes.markLabel,
                thumb: classes.thumb,
            }}
        />
    )
})
