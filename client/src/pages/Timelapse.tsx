import { Container, Grid, Group, Slider, createStyles } from '@mantine/core'
import { Canvas } from '../components/Canvas'

import { IconPlayerPause, IconMultiplier1x } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
}))

export const Timelapse = () => {
    const { classes } = useStyles()

    const marks = [
        { value: 25, label: '06:00' },
        { value: 50, label: '12:00' },
        { value: 75, label: '18:00' },
    ]

    return (
        <Container className={classes.container} size="sm" px="sm">
            <h1>Timelapse</h1>
            <Grid>
                <Grid.Col xs={12}><Canvas /></Grid.Col>
                <Grid.Col xs={12}>
                    <Grid>
                        <Grid.Col xs={11}>
                            <Slider defaultValue={40} marks={marks} />
                        </Grid.Col>
                        <Grid.Col xs={1}>
                            <IconPlayerPause />
                            <IconMultiplier1x />
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
            </Grid>
        </Container>
    )
}