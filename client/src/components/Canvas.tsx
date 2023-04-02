import { observer } from 'mobx-react'
import { createStyles } from '@mantine/core'

import { useCanvas } from '../hooks/useCanvas'
import { useStores } from '../stores'
import { useEffect, useRef } from 'react'
import { Controls } from './Controls'

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
    const { server } = useStores()
    const { classes } = useStyles()

    const draw = (ctx: any, frameCount: number) => {
        const img = new Image()
        img.src = server.host + '/media/captures/2023/20230331_110008.jpg'
        img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }

    const canvasRef = useCanvas(draw)
    const containerRef = useRef(null)
    useEffect(() => {
        if (containerRef.current && canvasRef.current) {
            canvasRef.current.height = containerRef.current.clientHeight
            canvasRef.current.width = containerRef.current.clientWidth
        }
    }, [containerRef, canvasRef])

    return (
        <div className={classes.container} ref={containerRef}>
            <canvas className={classes.canvas} ref={canvasRef} />
            <Controls />
        </div>
    )
})
