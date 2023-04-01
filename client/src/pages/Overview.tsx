import { createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
    },
}))

export const Overview = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            Overview
        </div>
    )
}