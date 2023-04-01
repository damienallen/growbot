import { createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },
}))

export const Timeseries = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            Timeseries
        </div>
    )
}