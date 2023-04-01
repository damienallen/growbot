import { Container, createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
    },
}))

export const Settings = () => {
    const { classes } = useStyles()
    return (
        <Container>
            <div className={classes.container}>
                <h1>Settings</h1>
            </div>
        </Container>
    )
}