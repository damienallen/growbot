import { observer } from 'mobx-react'
import { Slider, rem, useMantineTheme } from '@mantine/core'

import { useStores } from '../stores'
import { useEffect, useState } from 'react'



export const ProgressSlider = observer(() => {
    const theme = useMantineTheme()
    const { timelapse } = useStores()

    const [sliderValue, setSliderValue] = useState(0)

    useEffect(() => {
        setSliderValue(timelapse.index)
    }, [timelapse.index])

    const marks = false ? [
        { value: 25, label: '06:00' },
        { value: 50, label: '12:00' },
        { value: 75, label: '18:00' },
    ] : undefined

    return (
        <Slider
            onChange={(ind: number) => {
                timelapse.setIndex(ind)
                timelapse.setPaused(true)
            }}
            value={sliderValue}
            max={timelapse.captures.length}
            marks={marks}
            size={4}
            styles={{
                track: {
                    backgroundColor: '#f00'
                },
                mark: {
                    width: rem(6),
                    height: rem(6),
                    borderRadius: rem(6),
                    transform: `translateX(-${rem(3)}) translateY(-${rem(2)})`,
                    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                },
                markFilled: {
                    borderColor: theme.colors.blue[6],
                },
                markLabel: { fontSize: theme.fontSizes.xs, marginBottom: rem(5), marginTop: 0 },
                thumb: {
                    height: rem(16),
                    width: rem(16),
                    backgroundColor: theme.white,
                    borderWidth: rem(1),
                    boxShadow: theme.shadows.sm,
                },
            }}
        />
    )
})
