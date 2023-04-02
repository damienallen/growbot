import { Container, Grid, createStyles } from '@mantine/core'
import { Canvas } from '../components/Canvas'


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
            <h1>Timelapse</h1>
            <Grid>
                <Grid.Col xs={12}><Canvas /></Grid.Col>
            </Grid>
        </Container>
    )
}