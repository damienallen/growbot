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
import { ProgressSlider } from './ProgressSlider'

const useStyles = createStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        padding: '24px 16px',
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
        flexDirection: 'column',
        flex: 0
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        flex: 0
    },
    button: {
        padding: '0 4px'
    },
    slider: {
        flex: 0,
        marginBottom: theme.spacing.xs,
        padding: theme.spacing.sm,
    },
    timestamp: {
        paddingRight: theme.spacing.sm,
        fontWeight: 'bold'
    }
}))

const OverlayIcon = (props: { icon: any }) => {
    return <props.icon strokeWidth={1.5} color="white" size="36" />
}

export const Overlay = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()

    const playbackIcon = timelapse.paused ?
        <OverlayIcon icon={IconPlayerPlay} /> :
        <OverlayIcon icon={IconPlayerPause} />

    let speedIcon
    switch (timelapse.speed) {
        case 0.5:
            speedIcon = <OverlayIcon icon={IconMultiplier05x} />
            break;

        case 1:
            speedIcon = <OverlayIcon icon={IconMultiplier1x} />
            break;

        case 1.5:
            speedIcon = <OverlayIcon icon={IconMultiplier15x} />
            break;

        case 2:
            speedIcon = <OverlayIcon icon={IconMultiplier2x} />
            break;

        default:
            break;
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div></div>
                <div className={classes.timestamp}>
                    {timelapse.currentTimestamp}
                </div>
            </div>
            <div className={classes.footer}>
                <div className={classes.slider}>
                    <ProgressSlider />
                </div>
                <div className={classes.controls}>
                    <UnstyledButton onClick={timelapse.togglePlayback} className={classes.button}>
                        {playbackIcon}
                    </UnstyledButton>
                    <UnstyledButton onClick={timelapse.toggleSpeed} className={classes.button}>
                        {speedIcon}
                    </UnstyledButton>
                </div>
            </div>
        </div>
    )
})
