import { createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },
}))

export const Settings = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            Settings
        </div>
    )
}