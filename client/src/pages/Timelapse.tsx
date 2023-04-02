import { Container, Grid, Slider, createStyles, useMantineTheme } from '@mantine/core'
import { Canvas } from '../components/Canvas'
import { useStores } from '../stores'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
}))

export const Timelapse = observer(() => {
    const theme = useMantineTheme()
    const { timelapse } = useStores()
    const { classes } = useStyles()

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
        <Container className={classes.container} size="sm" px="sm">
            <h1>Timelapse</h1>
            <Grid>
                <Grid.Col xs={12}><Canvas /></Grid.Col>
                <Grid.Col xs={12}>
                    <Slider
                        color={theme.colorScheme === 'dark' ? 'green' : 'gray'}
                        onChange={(ind: number) => {
                            timelapse.setIndex(ind)
                            timelapse.setPaused(true)
                        }}
                        value={sliderValue}
                        max={timelapse.captures.length}
                        marks={marks}
                        size={4}
                    />
                </Grid.Col>
            </Grid>
        </Container>
    )
})