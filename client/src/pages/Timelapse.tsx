import { Container, createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
    },
}))

export const Timelapse = () => {
    const { classes } = useStyles()
    return (
        <Container>
            <div className={classes.container}>
                <h1>Timelapse</h1>
            </div>
        </Container>
    )
}