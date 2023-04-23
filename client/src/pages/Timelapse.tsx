import { Container, Grid, Group, createStyles } from '@mantine/core'
import { Canvas } from '../components/Canvas'
import { WindowSize } from '../components/WindowSize'
import { RangeSelect } from '../components/RangeSelect'

const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    window: {
        display: 'flex',
        flexDirection: 'row',
        gap: theme.spacing.lg,
    },
}))

export const Timelapse = () => {
    const { classes } = useStyles()

    return (
        <Container className={classes.container} size="sm" px="sm">
            <Group position="apart">
                <h1>Timelapse</h1>
                <div className={classes.window}>
                    <RangeSelect />
                    <WindowSize />
                </div>
            </Group>
            <Grid>
                <Grid.Col xs={12}>
                    <Canvas />
                </Grid.Col>
            </Grid>
        </Container>
    )
}
