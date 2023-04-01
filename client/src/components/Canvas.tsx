import { createStyles } from '@mantine/core'

import { useCanvas } from '../hooks/useCanvas'

const useStyles = createStyles((theme) => ({
    container: {
        flex: 1,
        height: '320px',
        background: '#ddd',
        borderRadius: '0.5rem'
    },
}))

export const Canvas = () => {
    const { classes } = useStyles()

    const draw = (ctx: any) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        const img = new Image()
        img.onload = function () {
            ctx.drawImage(img, 0, 0)
        }
        img.src = '/files/4531/backdrop.png'
    }

    const canvasRef = useCanvas(draw)

    return (
        <div className={classes.container}>
            <canvas ref={canvasRef} />
        </div>
    )
}
