import { memo } from 'react'

import { formatDuration } from '../lib/utils'
import { useAppSelector } from '../store/store'
import WaveSurferPlayer from './WaveSurferPlayer'

interface Props {
  index: number
}

const Track = memo(({ index }: Props) => {
  const track = useAppSelector(state => state.lufs.data[index])

  return (
    <>
      <tr key={index} style={track.status === 'error' ? { color: 'red' } : {}}>
        <td>{track.name}</td>
        <td>{(track.size / (1024 * 1024)).toFixed(2)} Mb</td>
        <td>{track.duration && formatDuration(track.duration)}</td>
        <td>{track.integrated?.toFixed(1)}</td>
        <td>{track.short.length > 0 && Math.max(...track.short).toFixed(1)}</td>
        <td>{track.isMono && 'Mono'}</td>
      </tr>
      <tr>
        <td colSpan={7}>
          <WaveSurferPlayer
            height={100}
            waveColor="rgb(200, 0, 200)"
            progressColor="rgb(100, 0, 100)"
            url={track.url}
          />
        </td>
      </tr>
    </>
  )
})

export default Track
