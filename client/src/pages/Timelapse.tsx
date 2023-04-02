import { Container, Grid, Slider, createStyles } from '@mantine/core'
import { Canvas } from '../components/Canvas'
import { useStores } from '../stores'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
}))

export const Timelapse = () => {
    const { server } = useStores()
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
                    <Slider defaultValue={0} max={server.captures.length} marks={marks} />
                </Grid.Col>
            </Grid>
        </Container>
    )
}