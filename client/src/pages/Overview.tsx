import { Container, createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
    },
}))

export const Overview = () => {
    const { classes } = useStyles()
    return (
        <Container>
            <div className={classes.container}>
                <h1>Overview</h1>
            </div>
        </Container>
    )
}