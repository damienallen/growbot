import { observer } from 'mobx-react'
import { UnstyledButton, createStyles } from '@mantine/core'

import { IconPlayerPlay, IconPlayerPause, IconMultiplier1x } from '@tabler/icons-react'
import { useStores } from '../stores'

const useStyles = createStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: '16px 12px',
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
    },
    button: {
        padding: '0 4px'
    }
}))

export const Controls = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()

    const playbackButton = timelapse.paused ? <IconPlayerPlay color="white" /> : <IconPlayerPause color="white" />

    return (
        <div className={classes.container}>
            <div className={classes.header}></div>
            <div className={classes.footer}>
                <UnstyledButton onClick={timelapse.togglePlayback} className={classes.button}>
                    {playbackButton}
                </UnstyledButton>
                <UnstyledButton className={classes.button}>
                    <IconMultiplier1x color="white" />
                </UnstyledButton>
            </div>
        </div>
    )
})
