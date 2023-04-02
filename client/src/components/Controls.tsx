import { observer } from 'mobx-react'
import { createStyles } from '@mantine/core'

import { IconPlayerPause, IconMultiplier1x } from '@tabler/icons-react'

const useStyles = createStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: '12px 8px',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 0
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 0
    }
}))

export const Controls = observer(() => {
    const { classes } = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.header}></div>
            <div className={classes.footer}>
                <IconPlayerPause />
                <IconMultiplier1x />
            </div>
        </div>
    )
})
