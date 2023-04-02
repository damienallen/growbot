import { useRef, useEffect } from 'react'

export const useCanvas = (draw: any) => {

    const canvasRef: any = useRef(null)

    useEffect(() => {

        const canvas: any = canvasRef.current
        const context = canvas.getContext('2d')

        let frameCount = 0
        let animationFrameId: any

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}
