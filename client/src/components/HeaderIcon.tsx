import { createStyles } from '@mantine/core'
import { RiPlantLine } from 'react-icons/ri'


const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        height: '24px',
        width: '24px',
    },
    text: {
        marginLeft: theme.spacing.xs,
        fontWeight: 'bold'
    },
}))

export const HeaderIcon = () => {
    const { classes } = useStyles()
    return (
        <div className={classes.container}>
            <RiPlantLine className={classes.icon} />
            <div className={classes.text}>growbot</div>
        </div>
    )
}