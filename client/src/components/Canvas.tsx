import { observer } from 'mobx-react'
import { createStyles } from '@mantine/core'

import { useCanvas } from '../hooks/useCanvas'
import { useStores } from '../stores'
import { useEffect, useRef } from 'react'
import { Overlay } from './Overlay'

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        flex: 1,
        aspectRatio: '4 / 3',
        width: '100%',
    },
    canvas: {
        background: '#ddd',
        borderRadius: '0.5rem'
    }
}))

export const Canvas = observer(() => {
    const { timelapse } = useStores()
    const { classes } = useStyles()

    const draw = (ctx: any) => {
        const img = new Image()
        img.src = timelapse.currentImg
        img.onload = () => ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
    }

    const canvasRef = useCanvas(draw)
    const containerRef: any = useRef(null)
    useEffect(() => {
        if (containerRef.current && canvasRef.current) {
            canvasRef.current.height = containerRef.current.clientHeight
            canvasRef.current.width = containerRef.current.clientWidth
        }
    }, [containerRef, canvasRef])

    return (
        <div className={classes.container} ref={containerRef}>
            <canvas className={classes.canvas} ref={canvasRef} />
            <Overlay />
        </div>
    )
})
