import { createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },
}))

export const Timelapse = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            Timelapse
        </div>
    )
}