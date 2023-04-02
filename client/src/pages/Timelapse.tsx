import { Container, Grid, Group, createStyles } from '@mantine/core'
import { Canvas } from '../components/Canvas'
import { WindowSelect } from '../components/WindowSelect'


const useStyles = createStyles(() => ({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
}))

export const Timelapse = () => {
    const { classes } = useStyles()

    return (
        <Container className={classes.container} size="sm" px="sm">
            <Group position="apart">
                <h1>Timelapse</h1>
                <WindowSelect />
            </Group>
            <Grid>
                <Grid.Col xs={12}><Canvas /></Grid.Col>
            </Grid>
        </Container>
    )
}