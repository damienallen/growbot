import { observer } from 'mobx-react'
import { UnstyledButton, createStyles } from '@mantine/core'

import {
    IconPlayerPlay,
    IconPlayerPause,
    IconMultiplier05x,
    IconMultiplier1x,
    IconMultiplier15x,
    IconMultiplier2x,
} from '@tabler/icons-react'
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

    const playbackIcon = timelapse.paused ?
        <IconPlayerPlay color="white" size="36" /> :
        <IconPlayerPause color="white" size="36" />

    let speedIcon
    switch (timelapse.speed) {
        case 0.5:
            speedIcon = <IconMultiplier05x color="white" size="36" />
            break;

        case 1:
            speedIcon = <IconMultiplier1x color="white" size="36" />
            break;

        case 1.5:
            speedIcon = <IconMultiplier15x color="white" size="36" />
            break;

        case 2:
            speedIcon = <IconMultiplier2x color="white" size="36" />
            break;

        default:
            break;
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}></div>
            <div className={classes.footer}>
                <UnstyledButton onClick={timelapse.togglePlayback} className={classes.button}>
                    {playbackIcon}
                </UnstyledButton>
                <UnstyledButton onClick={timelapse.toggleSpeed} className={classes.button}>
                    {speedIcon}
                </UnstyledButton>
            </div>
        </div>
    )
})
