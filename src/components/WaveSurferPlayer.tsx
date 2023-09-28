import {
  type RefObject,
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
} from 'react'
import WaveSurfer, { type WaveSurferOptions } from 'wavesurfer.js'

const useWaveSurfer = (
  containerRef: RefObject<HTMLElement>,
  options: Omit<WaveSurferOptions, 'container' | 'interact'>,
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()

  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      interact: false,
      container: containerRef.current,
    })

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}

const WaveSurferPlayer = memo(
  (props: Omit<WaveSurferOptions, 'container' | 'interact'>) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const wavesurfer = useWaveSurfer(containerRef, props)

    const play = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const seekTo = (e.clientX - left) / width
        wavesurfer?.seekTo(seekTo)
        wavesurfer?.play()
      },
      [wavesurfer],
    )

    const pause = useCallback(() => {
      wavesurfer?.pause()
    }, [wavesurfer])

    useEffect(() => {
      window.addEventListener('mouseup', pause)
      window.addEventListener('blur', pause)
      return () => {
        window.removeEventListener('mouseup', pause)
        window.removeEventListener('blur', pause)
      }
    }, [pause])

    return (
      <div ref={containerRef} style={{ minHeight: 120 }} onMouseDown={play} />
    )
  },
)

export default WaveSurferPlayer
